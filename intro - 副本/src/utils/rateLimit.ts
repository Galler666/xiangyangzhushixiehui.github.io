const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15分钟
  maxRequests: 100
};

const requestTimes: { [ip: string]: number[] } = {};

export const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  
  if (!requestTimes[ip]) {
    requestTimes[ip] = [];
  }
  
  // 清理过期的请求记录
  requestTimes[ip] = requestTimes[ip].filter(time => time > windowStart);
  
  // 检查是否超过限制
  if (requestTimes[ip].length >= RATE_LIMIT.maxRequests) {
    return false;
  }
  
  // 记录新的请求
  requestTimes[ip].push(now);
  return true;
}; 