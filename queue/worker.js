const { Worker } = require("bullmq");

const worker = new Worker("tasks", async (job) => {
  console.log(`Processing job:`, job.data);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing
}, { connection: { host: "127.0.0.1", port: 6379 } });

console.log("Worker started...");
