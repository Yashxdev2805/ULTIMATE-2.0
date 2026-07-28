/**
 * Security Utility & Rate Limiter Engine
 */

// In-memory rate limiting store: IP -> { count, startTime }
const rateLimitMap = new Map<string, { count: number; startTime: number }>();

const MAX_REQUESTS = 10; // Max 10 requests
const WINDOW_MS = 15 * 1000; // per 15 seconds

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks and updates rate limit for a given identifier (IP or client key)
 */
export function checkRateLimit(identifier: string = 'global'): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.startTime > WINDOW_MS) {
    rateLimitMap.set(identifier, { count: 1, startTime: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetInSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (entry.count >= MAX_REQUESTS) {
    const resetInSeconds = Math.ceil((entry.startTime + WINDOW_MS - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  entry.count += 1;
  rateLimitMap.set(identifier, entry);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetInSeconds: Math.ceil((entry.startTime + WINDOW_MS - now) / 1000),
  };
}

/**
 * Sanitizes input string to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}
