const express = require("express");
const { updateProfile } = require("../controllers/profileControllers");
const router = express.Router();

router.post("/update", updateProfile);

module.exports = router;
