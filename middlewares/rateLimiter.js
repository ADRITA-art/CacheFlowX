const redisClient = require("../config/redisConfig");

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const limit = 5; //5 requests per minute
  const ttl = 60; // 60 seconds

  const requests = await redisClient.incr(ip);
  if (requests === 1) await redisClient.expire(ip, ttl);

  if (requests > limit) {
    return res.status(429).json({ message: "Too many requests! Try again later." });
  }

  next();
};

module.exports = rateLimiter;
