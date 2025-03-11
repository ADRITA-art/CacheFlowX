const redisClient = require("../config/redisConfig");
const updateScore = async (req, res) => {
  const { username, score } = req.body;

  // Store user score in Redis Sorted Set
  redisClient.zadd("leaderboard", score, username, (err, reply) => {
    if (err) return res.status(500).json({ message: "Error updating leaderboard" });
    res.json({ message: "Score updated successfully!" });
  });
};

const getLeaderboard = async (req, res) => {
  redisClient.zrevrange("leaderboard", 0, 9, "WITHSCORES", (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving leaderboard" });

    let leaderboard = [];
    for (let i = 0; i < result.length; i += 2) {
      leaderboard.push({ username: result[i], score: result[i + 1] });
    }
    res.json({ leaderboard });
  });
};

module.exports = { updateScore, getLeaderboard };
