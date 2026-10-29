// Backend API URL
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ==========================================
// GET ALL TASKS
// ==========================================

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

// ==========================================
// CREATE TASK
// ==========================================

export async function createTask(task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

// ==========================================
// UPDATE TASK
// ==========================================

export async function updateTask(id, task) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}

// ==========================================
// DELETE TASK
// ==========================================

export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}

// ==========================================
// AI TASK DESCRIPTION GENERATOR
// ==========================================

export async function generateTaskDescription(title) {
  const response = await fetch(
    `${BASE_URL}/api/ai/generate-description`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to generate AI description"
    );
  }

  return data.description;
}