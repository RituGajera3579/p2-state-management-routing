
const EventEmitter = require("events");

const taskEventEmitter = new EventEmitter();

taskEventEmitter.on("task-created", (task) => {
  setImmediate(() => {
    console.log("\n--- Background Notification ---");
    console.log("Task Title:", task.title);
    console.log("Assigned User:", task.assignedUser || "Not assigned");
    console.log("Notification Time:", new Date().toISOString());
    console.log("Notification completed.");
  });
});

module.exports = taskEventEmitter;
