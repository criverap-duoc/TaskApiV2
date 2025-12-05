import { useState, useMemo } from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

export default function TaskList({ tasks = [], onDelete, onUpdate, onArchive }) {
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState("created_desc");

  const filtered = useMemo(() => {
    let list = tasks.slice();

    if (!showArchived) {
      list = list.filter(t => !t.isArchived);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => (t.title + " " + (t.description||"")).toLowerCase().includes(q)
        || (t.tags || []).some(tag => tag.toLowerCase().includes(q)));
    }

    if (priorityFilter !== "All") {
      list = list.filter(t => (t.priorityLevel || "Medium").toLowerCase() === priorityFilter.toLowerCase());
    }

    if (sortBy === "deadline_asc") {
      list.sort((a,b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    } else if (sortBy === "priority_desc") {
      const order = { high: 2, medium: 1, low: 0 };
      list.sort((a,b) => (order[(b.priorityLevel||"medium").toLowerCase()] ?? 1) - (order[(a.priorityLevel||"medium").toLowerCase()] ?? 1));
    } else {
      list.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [tasks, query, priorityFilter, showArchived, sortBy]);

  return (
    <div>
      <div className="tasklist-toolbar" style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <input placeholder="Buscar..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="created_desc">Recientes</option>
          <option value="deadline_asc">Próximo deadline</option>
          <option value="priority_desc">Prioridad</option>
        </select>

        <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={showArchived} onChange={e => setShowArchived(e.target.checked)} />
          Mostrar archivadas
        </label>
      </div>

      <div className="task-list">
        {filtered.map(task => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} onArchive={onArchive} />
        ))}
      </div>
    </div>
  );
}
