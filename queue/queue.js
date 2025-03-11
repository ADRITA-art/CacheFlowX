const { Queue } = require("bullmq");
const redisConfig = { connection: { host: "127.0.0.1", port: 6379 } };

const taskQueue = new Queue("tasks", redisConfig);

const addTask = async (taskData, delay = 0) => {
  await taskQueue.add("task", taskData, { delay });
};

module.exports = { addTask };
