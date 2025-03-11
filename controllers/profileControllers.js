const redisClient = require("../config/redisConfig");

const updateProfile = async (req, res) => {
  const { username } = req.body; 
  const lockKey = `lock:${username}`;
  const lockTTL = 10; // Lock expires in 10 seconds

  try {
    const lock = await redisClient.set(lockKey, "locked", "EX", lockTTL, "NX");
    
    // If lock already exists, reject request
    if (!lock) {
      console.log(`Lock already exists for ${lockKey}. Request denied.`);
      return res.status(429).json({ message: "Too many requests. Please wait." });
    }

    console.log(`Lock acquired for ${lockKey}`);
    await new Promise((resolve) => setTimeout(resolve, 5000)); 

    console.log(`Profile updated for ${username}`);
    await redisClient.del(lockKey);
    console.log(`Lock released for ${lockKey}`);

    res.json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    await redisClient.del(lockKey);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateProfile };
