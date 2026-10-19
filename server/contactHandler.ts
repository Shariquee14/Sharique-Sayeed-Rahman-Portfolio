import nodemailer from 'nodemailer';
import {
  countWords,
  isValidEmail,
  sanitizeHeaderField,
  escapeHtml,
  MAX_WORDS,
} from '../src/utils/contactValidation.ts';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  _hp?: string; // Honeypot field
}

export interface ContactResponse {
  status: number;
  body: {
    success: boolean;
    message?: string;
    error?: string;
  };
}

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 submissions
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(ip: string): boolean {
  // Never rate-limit localhost or internal development IPs
  if (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === 'localhost' ||
    ip === '::ffff:127.0.0.1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.')
  ) {
    return true;
  }

  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function processContactForm(
  payload: ContactSubmissionPayload,
  clientIp = '127.0.0.1'
): Promise<ContactResponse> {
  // 1. Honeypot check (anti-bot)
  if (payload._hp && payload._hp.trim() !== '') {
    // Silently reject bots without raising errors
    return {
      status: 200,
      body: { success: true, message: 'Message received.' },
    };
  }

  // 2. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      body: {
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting another message.',
      },
    };
  }

  // 3. Server-side validation
  const rawName = payload.name ? String(payload.name).trim() : '';
  const rawEmail = payload.email ? String(payload.email).trim() : '';
  const rawPhone = payload.phone ? String(payload.phone).trim() : '';
  const rawMessage = payload.message ? String(payload.message).trim() : '';

  if (!rawName) {
    return { status: 400, body: { success: false, error: 'Your name is required.' } };
  }

  if (rawName.length > 100) {
    return { status: 400, body: { success: false, error: 'Name must be 100 characters or less.' } };
  }

  if (!rawEmail || !isValidEmail(rawEmail)) {
    return { status: 400, body: { success: false, error: 'A valid email address is required.' } };
  }

  if (rawPhone && rawPhone.length > 30) {
    return { status: 400, body: { success: false, error: 'Phone number must be 30 characters or less.' } };
  }

  if (!rawMessage) {
    return { status: 400, body: { success: false, error: 'Message content is required.' } };
  }

  // 4. Strict 500-word limit check
  const wordCount = countWords(rawMessage);
  if (wordCount > MAX_WORDS) {
    return {
      status: 400,
      body: {
        success: false,
        error: `Your message contains ${wordCount} words, which exceeds the maximum allowed limit of 500 words. Please shorten your message.`,
      },
    };
  }

  // 5. Sanitize header fields to prevent email header injection
  const sanitizedName = sanitizeHeaderField(rawName);
  const sanitizedEmail = sanitizeHeaderField(rawEmail);
  const sanitizedPhone = sanitizeHeaderField(rawPhone);

  const destinationEmail = process.env.CONTACT_TO_EMAIL || 'ssrahman2002@gmail.com';
  const submissionDate = new Date();
  const formattedDate = submissionDate.toUTCString();

  // Email subject and bodies
  const subject = `New Portfolio Inquiry from ${sanitizedName}`;

  const textBody = [
    `NEW CONTACT FORM INQUIRY`,
    `=============================`,
    `From:      ${sanitizedName}`,
    `Email:     ${sanitizedEmail}`,
    `Phone:     ${sanitizedPhone || 'Not provided'}`,
    `Submitted: ${formattedDate}`,
    `Word Count:${wordCount} / 500 words`,
    `=============================`,
    ``,
    `MESSAGE:`,
    rawMessage,
  ].join('\n');

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #171717; background-color: #f5f5f5; margin: 0; padding: 24px; }
    .card { background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e5e5; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background-color: #0a0a0a; color: #ffffff; padding: 24px 32px; border-bottom: 3px solid #ea3826; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
    .content { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; color: #737373; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; font-family: monospace; }
    .value { font-size: 15px; color: #171717; font-weight: 500; }
    .message-box { background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; margin-top: 24px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #262626; }
    .footer { padding: 20px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5; font-size: 12px; color: #737373; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>PORTFOLIO TRANSMISSION</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${escapeHtml(sanitizedName)}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #ea3826; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${sanitizedPhone ? escapeHtml(sanitizedPhone) : '<span style="color: #a3a3a3;">Not provided</span>'}</div>
      </div>
      <div class="field">
        <div class="label">Transmission Time</div>
        <div class="value">${escapeHtml(formattedDate)}</div>
      </div>
      <div class="field">
        <div class="label">Message Content (${wordCount} words)</div>
        <div class="message-box">${escapeHtml(rawMessage)}</div>
      </div>
    </div>
    <div class="footer">
      Sent via Portfolio Contact Form &bull; Destination: ${escapeHtml(destinationEmail)}
    </div>
  </div>
</body>
</html>
  `.trim();

  // 6. Transporter determination
  // Option A: Resend API Key
  if (process.env.RESEND_API_KEY) {
    try {
      const fromAddress = process.env.SMTP_FROM || 'onboarding@resend.dev';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [destinationEmail],
          reply_to: sanitizedEmail,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Resend delivery failed with status:', res.status, errorText);
        return {
          status: 500,
          body: {
            success: false,
            error: 'Email delivery provider rejected the message. Please check server logs or contact directly via email.',
          },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          message: 'Message delivered successfully to inbox.',
        },
      };
    } catch (err: unknown) {
      console.error('Resend network/dispatch error:', err);
      return {
        status: 500,
        body: {
          success: false,
          error: 'Failed to dispatch email due to network error.',
        },
      };
    }
  }

  // Option B: Nodemailer with SMTP (e.g. Gmail App Password, SMTP host)
  const smtpHost = process.env.SMTP_HOST || (process.env.SMTP_USER?.includes('@gmail.com') ? 'smtp.gmail.com' : undefined);
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    if (smtpPass.includes('PASTE_YOUR') || smtpPass.trim() === '') {
      return {
        status: 503,
        body: {
          success: false,
          error:
            "Please open your .env file and replace 'PASTE_YOUR_16_CHAR_GMAIL_APP_PASSWORD_HERE' with your 16-character Google App Password (from https://myaccount.google.com/apppasswords).",
        },
      };
    }

    try {
      const cleanPass = smtpPass.replace(/\s+/g, '').trim();
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: cleanPass,
        },
      });

      const fromAddress = process.env.SMTP_FROM || `"Portfolio Contact Form" <${smtpUser}>`;

      await transporter.sendMail({
        from: fromAddress,
        to: destinationEmail,
        replyTo: sanitizedEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });

      return {
        status: 200,
        body: {
          success: true,
          message: 'Message delivered successfully to inbox.',
        },
      };
    } catch (err: unknown) {
      console.error('SMTP transmission error:', err);
      const errCode = (err as any)?.code;
      let userFriendlyError = 'Email transmission failed. Please verify SMTP credentials or contact directly.';
      
      if (errCode === 'EAUTH') {
        userFriendlyError = 'Gmail authentication failed (Bad Credentials). Please make sure you are using a 16-character Google App Password from https://myaccount.google.com/apppasswords (NOT your regular Gmail password).';
      }

      return {
        status: 500,
        body: {
          success: false,
          error: userFriendlyError,
        },
      };
    }
  }

  // Option C: No email delivery credentials configured
  return {
    status: 503,
    body: {
      success: false,
      error:
        'Email service is not yet configured. Please configure SMTP_USER/SMTP_PASS or RESEND_API_KEY in your environment variables.',
    },
  };
}
