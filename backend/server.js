
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const taskEventEmitter = require("./events/taskEvents");
const { cache, stats } = require("./cache");

require("dotenv").config();

// ==========================================
// INITIALIZE APP
// ==========================================

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send("Task Manager API is Running...");
});

// ==========================================
// FREE DEMO TASK DESCRIPTION GENERATOR
// ==========================================

app.post("/api/ai/generate-description", (req, res) => {
  try {
    const { title } = req.body;

    // Validate title
    if (
      !title ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        error: "Task title is required",
      });
    }

    // Generate demo description
    const description =
      `Plan and complete "${title.trim()}". ` +
      "Break the task into manageable steps, " +
      "identify the required resources, and " +
      "review the result before marking it as completed.";

    return res.status(200).json({
      description,
      mode: "demo",
    });

  } catch (err) {
    console.error("Demo Description Error:", err.message);

    return res.status(500).json({
      error: "Description generation failed. Please try again.",
    });
  }
});

// ==========================================
// CREATE TASK
// ==========================================

app.post("/tasks", async (req, res) => {
  try {
    const taskData = {
      ...req.body,

      priority:
        typeof req.body.priority === "string"
          ? req.body.priority.charAt(0).toUpperCase() +
            req.body.priority.slice(1).toLowerCase()
          : req.body.priority,
    };

    // Save task in MongoDB
    const task = await Task.create(taskData);

    // Clear cached task list
    cache.del("all_tasks");

    console.log(
      "API Response Time:",
      new Date().toISOString()
    );

    // Send response
    res.status(201).json(task);

    // Emit task-created event
    taskEventEmitter.emit("task-created", {
      title: task.title,
      assignedUser: task.assignedUser || "Not assigned",
    });

  } catch (err) {
    console.error("Create Task Error:", err);

    res.status(400).json({
      error: err.message,
    });
  }
});

// ==========================================
// GET ALL TASKS
// ==========================================

app.get("/tasks", async (req, res) => {
  try {
    // Check cache
    const cachedTasks = cache.get("all_tasks");

    if (cachedTasks !== undefined) {
      stats.hit();

      console.log("Cache HIT - Returning tasks from cache");

      return res.status(200).json(cachedTasks);
    }

    // Cache miss
    stats.miss();

    console.log("Cache MISS - Fetching tasks from MongoDB");

    // Fetch tasks
    const tasks = await Task.find();

    // Store tasks in cache
    cache.set("all_tasks", tasks);

    console.log("Cache keys after set:", cache.keys());

    console.log(
      "Cache value exists:",
      cache.get("all_tasks") !== undefined
    );

    return res.status(200).json(tasks);

  } catch (err) {
    console.error("Get Tasks Error:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

// ==========================================
// GET SINGLE TASK
// ==========================================

app.get("/tasks/:id", async (req, res) => {
  try {
    const cacheKey = `task_${req.params.id}`;

    // Check cache
    const cachedTask = cache.get(cacheKey);

    if (cachedTask !== undefined) {
      stats.hit();

      console.log("Cache HIT - Returning task from cache");

      return res.status(200).json(cachedTask);
    }

    // Cache miss
    stats.miss();

    console.log("Cache MISS - Fetching task from MongoDB");

    // Fetch task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    // Store task in cache
    cache.set(cacheKey, task);

    return res.status(200).json(task);

  } catch (err) {
    console.error("Get Task Error:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

// ==========================================
// UPDATE TASK
// ==========================================

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    // Clear cached data
    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);

    return res.status(200).json(task);

  } catch (err) {
    console.error("Update Task Error:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

// ==========================================
// DELETE TASK
// ==========================================

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    // Clear cached data
    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);

    return res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (err) {
    console.error("Delete Task Error:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

// ==========================================
// CACHE STATISTICS
// ==========================================

// Get cache statistics
app.get("/cache-stats", (req, res) => {
  return res.status(200).json({
    ...stats.get(),
    keys: cache.keys(),
    ttl: 60,
  });
});

// Reset cache statistics
app.delete("/cache-stats", (req, res) => {
  stats.reset();

  return res.status(200).json({
    message: "Cache statistics reset successfully",
  });
});

// ==========================================
// GLOBAL ERROR HANDLING
// ==========================================

app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack || err);

  res.status(500).json({
    error: "Something went wrong",
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
