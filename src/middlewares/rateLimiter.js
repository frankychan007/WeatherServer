import rateLimit from 'express-rate-limit';

export const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute in milliseconds
  max: 100,
  message: 'You have exceeded the 100 requests in 10-min limit',
  headers: true,
});
