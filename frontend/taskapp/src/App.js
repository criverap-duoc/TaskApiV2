import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask, archiveTask } from "./Api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import Header from "./components/Header";
import "./Dark.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleCreate(task) {
    await createTask(task);
    await loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(id);
    await loadTasks();
  }

  async function handleUpdate(id, updatedTask) {
    await updateTask(id, updatedTask);
    await loadTasks();
  }

  async function handleArchive(id) {
    try {
      await archiveTask(id);
    } catch {
      await updateTask(id, { ...(tasks.find(t => t.id === id) || {}), isArchived: true });
    }
    await loadTasks();
  }

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  function toggleDarkMode() {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", newMode);
  }

  return (
    <>
      <Header darkMode={darkMode} onToggleDark={toggleDarkMode} />

      <div className="app-container">
        <h1 className="app-title">Administrador de Tareas</h1>

        <TaskForm onCreate={handleCreate} />
        <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} onArchive={handleArchive} />
      </div>
    </>
  );
}

export default App;
