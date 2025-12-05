import "./Header.css";

export default function Header({ darkMode, onToggleDark }) {
  return (
    <header className="header">
      <div className="header-title">Task App V2</div>

      <nav className="header-nav">
        <a href="#">Home</a>
        <a href="#">Tareas</a>
        <a href="#">Acerca de</a>
      </nav>

      <button className="dark-toggle" onClick={onToggleDark}>
        {darkMode ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
