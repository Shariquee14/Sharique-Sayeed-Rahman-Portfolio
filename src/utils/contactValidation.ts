/**
 * Shared validation and sanitization helpers for the contact form
 * Used consistently across both frontend and server-side logic.
 */

export const MAX_WORDS = 500;

/**
 * Counts words by trimming whitespace and splitting on consecutive whitespace characters.
 * Handles single/multiple spaces, tabs, line breaks, and empty strings accurately.
 */
export function countWords(text: string): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Trims text to an exact maximum word limit, preserving whitespace between words
 * up to the limit and cutting off excess words cleanly.
 */
export function trimToWordLimit(text: string, limit: number = MAX_WORDS): string {
  if (!text) return '';
  const trimmed = text.trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
  if (words.length <= limit) return text;

  // Locate the character index where the limit-th word ends
  let count = 0;
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  let cutIndex = text.length;

  while ((match = regex.exec(text)) !== null) {
    count++;
    if (count === limit) {
      cutIndex = match.index + match[0].length;
      break;
    }
  }

  return text.slice(0, cutIndex);
}

/**
 * Validates standard email address format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant regex simplified for practical web forms
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.trim().length <= 150;
}

/**
 * Sanitizes single-line fields to prevent email header injection (\r, \n)
 */
export function sanitizeHeaderField(value: string): string {
  if (!value) return '';
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * HTML escapes strings to prevent XSS / HTML injection in email viewers
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
