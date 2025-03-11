const redisClient = require("../config/redisConfig");

const setUserPreference = async (req, res) => {
  const { username, theme, notifications } = req.body;

  redisClient.hmset(`user:${username}`, "theme", theme, "notifications", notifications, (err, reply) => {
    if (err) return res.status(500).json({ message: "Error saving preferences" });
    res.json({ message: "Preferences saved successfully!" });
  });
};

const getUserPreference = async (req, res) => {
  const { username } = req.params;

  redisClient.hgetall(`user:${username}`, (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching preferences" });
    res.json(result || {});
  });
};

module.exports = { setUserPreference, getUserPreference };
