const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/taskRoutes");
const rateLimiter = require("./middlewares/rateLimiter");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", rateLimiter, userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tasks", taskRoutes);



app.listen(3000, () => console.log("🚀 Server running on port 3000"));
