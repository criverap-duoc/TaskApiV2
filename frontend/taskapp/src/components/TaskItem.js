import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./TaskItem.css";

export default function TaskItem({ task, onDelete, onUpdate, onArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [isRemoving, setIsRemoving] = useState(false);

  function handleSave() {
    const updated = { ...task, title };
    onUpdate(task.id, updated);
    setIsEditing(false);
  }

  function handleToggleDone() {
    onUpdate(task.id, { ...task, isDone: !task.isDone });
  }

  function handleDeleteClick() {
    setIsRemoving(true);
  }

  function handleAnimationEnd(e) {
    if (isRemoving && e.animationName === "taskRemove") {
      onDelete(task.id);
    }
  }

  function handleArchive() {
    if (typeof onArchive === "function") {
      onArchive(task.id);
    } else {
      onUpdate(task.id, { ...task, isArchived: true });
    }
  }

  const createdText = task.createdAt ? formatDistanceToNow(parseISO(task.createdAt), { addSuffix: true }) : "";
  let deadlineText = "";
  let isOverdue = false;
  let isDueSoon = false;
  if (task.deadline) {
    const dl = parseISO(task.deadline);
    const now = new Date();
    const diffMs = dl - now;
    isOverdue = diffMs < 0 && !task.isDone;
    isDueSoon = diffMs > 0 && diffMs <= 1000 * 60 * 60 * 24;
    deadlineText = dl.toLocaleString();
  }

  const priorityNames = { 0: "Low", 1: "Medium", 2: "High" };
  const priorityName = priorityNames[task.priorityLevel] ?? (typeof task.priorityLevel === "string" ? task.priorityLevel : "Medium");
  const priorityClass = priorityName.toLowerCase();

  return (
    <div
      className={`task-item ${isRemoving ? "removing" : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="task-info">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={handleToggleDone}
            />
            <span className={task.isDone ? "task-done" : ""}>
              {task.title}
            </span>
          </div>

          <div className="task-buttons">
            <button className="btn btn-save" onClick={handleSave}>Guardar</button>
            <button className="btn btn-cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="checkbox" checked={task.isDone} onChange={handleToggleDone} />
              <span className={task.isDone ? "task-done" : ""}>{task.title}</span>

              <span className={`priority-badge ${priorityClass}`} style={{ marginLeft: 8 }}>
                {priorityName}
              </span>

              {task.tags && task.tags.length > 0 && (
                <span className="tag-list">
                  {task.tags.slice(0, 3).map((t, i) => <span key={i} className="tag">#{t}</span>)}
                  {task.tags.length > 3 && <span className="tag">+{task.tags.length - 3}</span>}
                </span>
              )}
            </div>

            <div style={{ fontSize: 12, color: "#6b7280" }}>
              <span>Creada {createdText}</span>
              {task.deadline && (
                <span style={{ marginLeft: 10 }}>
                  • Límite: <strong className={isOverdue ? "overdue" : isDueSoon ? "due-soon" : ""}>{deadlineText}</strong>
                </span>
              )}
            </div>

            {task.description && <div style={{ marginTop: 6, color: "#374151" }}>{task.description}</div>}
          </div>

          <div className="task-buttons">
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn btn-delete" onClick={handleDeleteClick}>Eliminar</button>
            <button className="btn btn-cancel" onClick={handleArchive}>Archivar</button>
          </div>
        </>
      )}
    </div>
  );
}
