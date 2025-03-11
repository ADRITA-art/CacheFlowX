const redisClient = require("../config/redisConfig");

const sendMessage = async (req, res) => {
    const { sender, message } = req.body;
    if (!sender || !message) return res.status(400).json({ error: "Sender and message are required" });

    try {
        await redisClient.lpush("chat:messages", JSON.stringify({ sender, message }));

        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Redis List Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await redisClient.lrange("chat:messages", 0, 4); // Get last 5 messages
        const parsedMessages = messages.map(msg => JSON.parse(msg));

        res.json({ messages: parsedMessages });
    } catch (error) {
        console.error("Redis List Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { sendMessage, getMessages };
