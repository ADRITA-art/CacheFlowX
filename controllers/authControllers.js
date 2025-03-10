const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisConfig");

const loginUser = async (req, res) => {
  const users = [{ username: "adrita", password: bcrypt.hashSync("securepassword", 8) }]; // Dummy user
  const { username, password } = req.body;


  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });


  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: username }, "secret", { expiresIn: "1h" });

  // Store token in Redis (expires in 1 hour)
  redisClient.setex(`session:${username}`, 3600, token);

  res.json({ message: "Login successful!", token });
};


const logoutUser = async (req, res) => {
  const { username } = req.body;
  redisClient.del(`session:${username}`, (err, reply) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    if (reply === 0) {
      return res.status(400).json({ message: "Session not found" });
    }
    res.json({ message: "Logout successful!" });
  });
};

module.exports = { loginUser, logoutUser };



