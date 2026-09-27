// Import Express framework
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Mongoose
const mongoose = require("mongoose");

// Import Task model
const Task = require("./models/Task");

// Import cache and cache statistics
const { cache, stats } = require("./cache");

// Load environment variables
require("dotenv").config();

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Task Manager API is Running...");
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    cache.del("all_tasks");

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const cachedTasks = cache.get("all_tasks");

    if (cachedTasks !== undefined) {
      stats.hit();

      console.log("Cache HIT - Returning tasks from cache");

      return res.status(200).json(cachedTasks);
    }

    stats.miss();

    console.log("Cache MISS - Fetching tasks from MongoDB");

    const tasks = await Task.find();

    cache.set("all_tasks", tasks);

    console.log("Cache keys after set:", cache.keys());
    console.log(
      "Cache value exists:",
      cache.get("all_tasks") !== undefined
    );

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get single task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const cacheKey = `task_${req.params.id}`;

    const cachedTask = cache.get(cacheKey);

    if (cachedTask !== undefined) {
      stats.hit();

      console.log("Cache HIT - Returning task from cache");

      return res.status(200).json(cachedTask);
    }

    stats.miss();

    console.log("Cache MISS - Fetching task from MongoDB");

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    cache.set(cacheKey, task);

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Update task by ID
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Delete task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Cache statistics endpoint
app.get("/cache-stats", (req, res) => {
  res.status(200).json({
    ...stats.get(),
    keys: cache.keys(),
    ttl: 60,
  });
});

// Reset cache statistics
app.delete("/cache-stats", (req, res) => {
  stats.reset();

  res.status(200).json({
    message: "Cache statistics reset successfully",
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong",
  });
});

// Set server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});