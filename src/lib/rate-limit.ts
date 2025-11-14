/**
 * Rate Limiting Utility
 * Prevents API abuse by limiting requests per IP address
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  })
}, 5 * 60 * 1000)

export interface RateLimitOptions {
  /**
   * Maximum number of requests allowed in the time window
   * @default 10
   */
  maxRequests?: number

  /**
   * Time window in milliseconds
   * @default 60000 (1 minute)
   */
  windowMs?: number
}

/**
 * Rate limit a request by IP address
 * @param identifier Unique identifier (usually IP address)
 * @param options Rate limit configuration
 * @returns Object with allowed status and remaining requests
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const { maxRequests = 10, windowMs = 60000 } = options

  const now = Date.now()
  const record = rateLimitStore[identifier]

  // No record or expired record
  if (!record || record.resetTime < now) {
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    }

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    }
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Increment count
  record.count++

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  }
}

/**
 * Get client IP address from request headers
 * @param headers Request headers
 * @returns IP address or 'unknown'
 */
export function getClientIp(headers: Headers): string {
  // Check common headers for client IP
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  return 'unknown'
}
