// src/Api.js
const API_URL = "http://localhost:5087/api/task"; // Reemplaza con tu URL real

export async function getTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener tareas");
    }
    return await response.json();
  } catch (error) {
    console.error("GET error:", error);
    return [];
  }
}

export async function createTask(task) {
  try {
    console.debug('CREATE request body:', JSON.stringify(task));
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      // Try to read server error details to ease debugging
      const text = await response.text();
      console.error("CREATE response not ok:", response.status, text);
      throw new Error("Error al crear tarea: " + (text || response.status));
    }
    return await response.json();
  } catch (error) {
    console.error("CREATE error:", error);
    throw error;
  }
}

export async function updateTask(id, updatedTask) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("UPDATE error:", error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar tarea");
    }
    return true;
  } catch (error) {
    console.error("DELETE error:", error);
    throw error;
  }
}

export async function archiveTask(id) {
  try {
    const response = await fetch(`${API_URL}/archive/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error al archivar tarea");
    }
    return true;
  } catch (error) {
    console.error("ARCHIVE error:", error);
    throw error;
  }
}
