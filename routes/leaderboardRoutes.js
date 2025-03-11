const express = require("express");
const { updateScore, getLeaderboard } = require("../controllers/leaderboardControllers");
const router = express.Router();

router.post("/update", updateScore);
router.get("/", getLeaderboard);

module.exports = router;
