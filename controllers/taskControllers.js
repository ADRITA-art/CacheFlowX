const { addTask } = require("../queue/queue");

const createTask = async (req, res) => {
  await addTask(req.body, 5000);
  res.json({ message: "Task added to queue!" });
};

module.exports = { createTask };
