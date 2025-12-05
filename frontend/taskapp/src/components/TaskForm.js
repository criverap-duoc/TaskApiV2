import { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const priorityMap = { Low: 0, Medium: 1, High: 2 };
    const task = {
      title: title.trim(),
      description: description.trim(),
      isDone: false,
      createdAt: new Date().toISOString(),
      deadline: deadline ? new Date(deadline).toISOString() : null,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      priorityLevel: priorityMap[priority] ?? 1, // send numeric enum value
      isArchived: false
    };


    try {
      setLoading(true);
      await onCreate(task);
      setTitle("");
      setDescription("");
      setDeadline("");
      setTags("");
      setPriority("Medium");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={`form-container ${expanded ? "expanded" : ""}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={loading}>{loading ? "Creando..." : "Crear"}</button>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Ocultar opciones" : "+ Opciones"}
        </button>
      </div>

      {expanded && (
        <div className="advanced-fields" style={{ marginTop: 12, display: "grid", gap: 8 }}>
          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              Fecha límite
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", width: 160 }}>
              Prioridad
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>

          <input
            placeholder="Tags (separados por comas)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      )}
    </form>
  );
}
