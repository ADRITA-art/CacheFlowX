const express = require("express");
const { setUserPreference, getUserPreference } = require("../controllers/preferencesControllers");
const router = express.Router();

router.post("/set", setUserPreference);
router.get("/:username", getUserPreference);

module.exports = router;
