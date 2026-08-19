import { useState, useEffect } from "react";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api";

function Projects() {
  // ==============================
  // STATES
  // ==============================

  const [tasks, setTasks] = useState([]);

  // GET
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CREATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [creating, setCreating] = useState(false);

  // UPDATE
  const [updating, setUpdating] = useState(false);

  // DELETE
  const [deleting, setDeleting] = useState(false);

  // SUCCESS MESSAGE
  const [message, setMessage] = useState("");

  // ==============================
  // GET - FETCH TASKS
  // ==============================

  const fetchTasks = () => {
    setLoading(true);
    setError(null);

    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        setError(err.message);
        setMessage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // ==============================
  // POST - CREATE TASK
  // ==============================

  const handleCreateTask = (e) => {
    e.preventDefault();

    setCreating(true);
    setError(null);
    setMessage("");

    const newTask = {
      title,
      description,
      priority,
    };

    createTask(newTask)
      .then((data) => {
        setTasks((prevTasks) => [
          ...prevTasks,
          data,
        ]);

        // Clear form
        setTitle("");
        setDescription("");
        setPriority("medium");

        setMessage("Task created successfully!");
      })
      .catch((err) => {
        setError(err.message);
        setMessage("");
      })
      .finally(() => {
        setCreating(false);
      });
  };

  // ==============================
  // PUT - UPDATE TASK
  // ==============================

  const handleUpdateTask = (task) => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: !task.completed,
    };

    setUpdating(true);
    setError(null);
    setMessage("");

    updateTask(task._id, updatedTask)
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item._id === data._id
              ? data
              : item
          )
        );

        setMessage("Task updated successfully!");
      })
      .catch((err) => {
        setError(err.message);
        setMessage("");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // ==============================
  // DELETE - DELETE TASK
  // ==============================

  const handleDeleteTask = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError(null);
    setMessage("");

    deleteTask(id)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter(
            (task) => task._id !== id
          )
        );

        setMessage("Task deleted successfully!");
      })
      .catch((err) => {
        setError(err.message);
        setMessage("");
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return <Spinner />;
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchTasks}
      />
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "40px",
      }}
    >
      {/* PAGE TITLE */}

      <h2
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "25px",
        }}
      >
        My Tasks
      </h2>

      {/* SUCCESS MESSAGE */}

      {message && (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
      )}

      {/* ==============================
          CREATE TASK FORM
      ============================== */}

      <form
        onSubmit={handleCreateTask}
        style={{
          width: "80%",
          maxWidth: "600px",
          margin: "20px auto 40px auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          style={{
            padding: "12px",
            fontSize: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>
        </select>

        <button
          type="submit"
          disabled={creating}
          style={{
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {creating
            ? "Creating..."
            : "Add Task"}
        </button>
      </form>

      {/* ==============================
          TASK LIST
      ============================== */}

      <div
        style={{
          width: "100%",
        }}
      >
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "10px",
              width: "80%",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                marginTop: "0",
                marginBottom: "12px",
              }}
            >
              {task.title}
            </h3>

            <p>{task.description}</p>

            <p>
              <strong>Priority:</strong>{" "}
              {task.priority}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {task.completed
                ? "Completed"
                : "Pending"}
            </p>

            {/* UPDATE BUTTON */}

            <button
              onClick={() =>
                handleUpdateTask(task)
              }
              disabled={updating}
              style={{
                padding: "10px 15px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              {updating
                ? "Updating..."
                : "Update Status"}
            </button>

            {/* DELETE BUTTON */}

            <button
              onClick={() =>
                handleDeleteTask(task._id)
              }
              disabled={deleting}
              style={{
                padding: "10px 15px",
                marginTop: "10px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              {deleting
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;