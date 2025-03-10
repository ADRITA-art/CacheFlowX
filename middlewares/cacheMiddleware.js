const redisClient = require("../config/redisConfig");

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;

  const cachedData = await redisClient.get(key);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }

  res.sendResponse = res.json;
  res.json = async (body) => {
    await redisClient.setex(key, 300, JSON.stringify(body)); // Cache for 5 mins
    res.sendResponse(body);
  };

  next();
};

module.exports = cacheMiddleware;
