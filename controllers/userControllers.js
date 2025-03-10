const redisClient = require("../config/redisConfig");

const getUsers = async (req, res) => {
  const cachedUsers = await redisClient.get("users");

  if (cachedUsers) {
    return res.json(JSON.parse(cachedUsers));
  }

  const users = [{ id: 1, name: "John Doe" }];
  await redisClient.setex("users", 300, JSON.stringify(users));

  res.json(users);
};

module.exports = { getUsers };
