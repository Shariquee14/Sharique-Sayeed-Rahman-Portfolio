import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Copy, Check, Send, ExternalLink, MessageSquare, AlertCircle } from 'lucide-react';
import { LinkedinIcon } from '../SocialIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import {
  countWords,
  trimToWordLimit,
  isValidEmail,
  MAX_WORDS,
} from '../../utils/contactValidation';

interface ContactViewProps {
  onBack: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _hp: '', // Honeypot field for anti-spam
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [wordLimitWarning, setWordLimitWarning] = useState<string | null>(null);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wordCount = countWords(formData.message);

  useEffect(() => {
    return () => {
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, []);

  const triggerWarning = (msg: string) => {
    setWordLimitWarning(msg);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    warningTimeoutRef.current = setTimeout(() => {
      setWordLimitWarning(null);
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = countWords(text);

    if (words > MAX_WORDS) {
      // Auto-trim to 500 words to strictly enforce the limit
      const trimmed = trimToWordLimit(text, MAX_WORDS);
      setFormData((prev) => ({ ...prev, message: trimmed }));
      triggerWarning("You've reached the 500-word limit. Please shorten your message.");
    } else {
      setFormData((prev) => ({ ...prev, message: text }));
      // Dismiss warning if user deletes/shortens text below 500 words
      if (words < MAX_WORDS && wordLimitWarning) {
        if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
        setWordLimitWarning(null);
      }
    }

    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Validate required fields
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      return;
    }

    // 2. Validate word count
    const words = countWords(formData.message);
    if (words > MAX_WORDS) {
      setErrorMessage("Your message exceeds the 500-word limit. Please shorten your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      let isSent = false;
      let replyMessage = '';

      // 1. If running on local dev server where /api/contact exists
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const result = await response.json().catch(() => ({}));
          if (response.ok && result.success) {
            isSent = true;
            replyMessage =
              result.message || 'Your message has been transmitted successfully! I will reply shortly.';
          }
        } catch {
          // Local endpoint not answering, fall through to FormSubmit
        }
      }

      // 2. On static GitHub Pages deployment, transmit via FormSubmit AJAX service
      if (!isSent) {
        try {
          const formSubmitResponse = await fetch('https://formsubmit.co/ajax/ssrahman2002@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone || 'N/A',
              message: formData.message,
              _subject: `New Portfolio Inquiry from ${formData.name}`,
              _template: 'table',
            }),
          });

          const fsResult = await formSubmitResponse.json().catch(() => ({}));
          if (
            formSubmitResponse.ok &&
            (fsResult.success === 'true' || fsResult.success === true)
          ) {
            isSent = true;
            replyMessage =
              'Your message has been transmitted successfully! I will reply shortly.';
          } else if (fsResult.message && fsResult.message.includes('Activation')) {
            // Activation notice (FormSubmit sends a one-time activation link to email)
            isSent = true;
            replyMessage =
              'Your message has been sent! (Note: Check ssrahman2002@gmail.com to complete one-time activation).';
          }
        } catch (fsErr) {
          console.warn('FormSubmit transmission fallback:', fsErr);
        }
      }

      if (isSent) {
        setSuccessMessage(replyMessage);
        // Reset form on successful delivery
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _hp: '',
        });
        setWordLimitWarning(null);
      } else {
        // 3. Guaranteed fallback: launch email client prefilled
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const bodyText = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:ssrahman2002@gmail.com?subject=${subject}&body=${bodyText}`;
        setSuccessMessage(
          'Connecting to email... Opening your email app to transmit directly to ssrahman2002@gmail.com.'
        );
      }
    } catch (err: unknown) {
      console.error('Contact transmission fallback:', err);
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const bodyText = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:ssrahman2002@gmail.com?subject=${subject}&body=${bodyText}`;
      setSuccessMessage(
        'Connecting to email... Opening your email app to transmit directly to ssrahman2002@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">RETURN TO PORTFOLIO DECK</span>
          <span className="sm:hidden">BACK TO DECK</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-xs text-[#ea3826] font-bold">//</span>
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">DIRECT TRANSMISSION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct channels and notice (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Main callout card with red accent */}
          <div className="bg-[#ea3826] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-mono text-[10px] tracking-widest text-neutral-950 font-bold bg-white/30 px-2.5 py-1 rounded-full uppercase">
                GET IN TOUCH
              </span>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-neutral-950 mt-4 tracking-tight uppercase leading-tight">
                LET'S BUILD SOMETHING IMPACTFUL.
              </h2>
            </div>

            {/* Stylized background watermark symbol */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-black/10 pointer-events-none" />
          </div>

          {/* Quick Copy Contact Card */}
          <div className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
            <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">
              Direct Contact Details
            </h4>

            {/* Email with copy button */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#ea3826]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#ea3826]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">PRIMARY INBOX</div>
                  <div className="text-xs font-mono font-semibold text-neutral-900 dark:text-white truncate">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="shrink-0 p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-900 dark:hover:bg-neutral-700 hover:text-white transition-all text-neutral-700 dark:text-neutral-200 shadow-2xs"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn direct */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center shrink-0">
                  <LinkedinIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">LINKEDIN NETWORK</div>
                  <div className="text-xs font-mono font-semibold text-neutral-900 dark:text-white">
                    in/sharique-sayeed-rahman
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7 bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-2xl text-neutral-950 dark:text-white">
                Send a Message
              </h3>
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                Replies typically within 24 hours.
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
              <MessageSquare className="w-5 h-5 text-[#ea3826]" />
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Success Message Box */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* Form with exact requested vertical stacking:
              1. Your Name *
              2. Your Email *
              3. Phone Number
              4. Message *
              5. TRANSMIT MESSAGE NOW
          */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field (hidden from legitimate users, catches spam bots) */}
            <input
              type="text"
              name="_hp"
              value={formData._hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none', position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />

            {/* Row 1: Your Name * */}
            <div className="w-full">
              <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                YOUR NAME *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ea3826] focus:border-transparent transition-all"
              />
            </div>

            {/* Row 2: Your Email * */}
            <div className="w-full">
              <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                YOUR EMAIL *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ea3826] focus:border-transparent transition-all"
              />
            </div>

            {/* Row 3: Phone Number */}
            <div className="w-full">
              <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ea3826] focus:border-transparent transition-all"
              />
            </div>

            {/* Row 4: Message * with internal scroll and temporary 500-word limit warning */}
            <div className="w-full">
              <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                MESSAGE *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleMessageChange}
                placeholder="Describe your project, timeline, or query..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ea3826] focus:border-transparent transition-all h-40 max-h-56 min-h-[140px] overflow-y-auto resize-y"
              />
              <AnimatePresence>
                {wordLimitWarning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-1.5 mt-2 px-1 text-xs font-mono font-medium text-[#ea3826]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{wordLimitWarning}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Row 5: Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || wordCount > MAX_WORDS}
              className="w-full py-3.5 px-6 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-mono text-xs font-bold hover:bg-[#ea3826] dark:hover:bg-[#ea3826] dark:hover:text-white transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-neutral-950/30 border-t-white dark:border-t-neutral-950 rounded-full animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE NOW</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
