const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/taskControllers");

router.post("/control", createTask);

module.exports = router;
