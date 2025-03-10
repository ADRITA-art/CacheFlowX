const express = require("express");

const { getUsers } = require("../controllers/userControllers");
const cacheMiddleware = require("../middlewares/cacheMiddleware");
const router = express.Router();

router.get("/", cacheMiddleware, getUsers);

module.exports = router;
