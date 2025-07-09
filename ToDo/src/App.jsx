import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const LOCAL_KEY = "todos-premium-react";
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" }
];

export default function App() {
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem(LOCAL_KEY);
  return saved ? JSON.parse(saved) : [];
});
const [filter, setFilter] = useState("all");
const [input, setInput] = useState("");
const [editingId, setEditingId] = useState(null);
const [editingText, setEditingText] = useState("");
const editInputRef = useRef(null);

useEffect(() => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}, [todos]);

useEffect(() => {
  if (editingId && editInputRef.current) {
    editInputRef.current.focus();
    editInputRef.current.select();
  }
}, [editingId]);

  // Sort: Priority first, then by completed, then by time
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.priority === b.priority) {
      if (a.completed === b.completed) {
        return b.id - a.id;
      }
      return a.completed ? 1 : -1;
    }
    return b.priority - a.priority;
  });

  const filteredTodos = sortedTodos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  function addTodo() {
    const text = input.trim();
    if (text) {
      setTodos([{ id: Date.now(), text, completed: false, priority: 0 }, ...todos]);
      setInput("");
    }
  }

  function toggleTodo(id) {
    setTodos(todos =>
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos => todos.filter(t => t.id !== id));
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  function finishEdit(id) {
    const text = editingText.trim();
    if (text) {
      setTodos(todos =>
        todos.map(t =>
          t.id === id ? { ...t, text } : t
        )
      );
    }
    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function clearCompleted() {
    setTodos(todos => todos.filter(t => !t.completed));
  }

  function togglePriority(id) {
    setTodos(todos =>
      todos.map(t =>
        t.id === id ? { ...t, priority: t.priority ? 0 : 1 } : t
      )
    );
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>
          <i className="fa-solid fa-list-check"></i> To-Do List
        </h2>
      </div>
      <div className="todo-input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={filter === f.value ? "active" : ""}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <i className="fa fa-inbox"></i> No tasks here! <br />
            <span style={{ fontSize: "0.95rem", color: "#4f8cff" }}>
              Add your first premium task ✨
            </span>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={
                "todo-item" +
                (todo.completed ? " completed" : "") +
                (editingId === todo.id ? " editing" : "")
              }
            >
              <div className="left">
                <div
                  className="check"
                  onClick={() => toggleTodo(todo.id)}
                  tabIndex={0}
                  aria-label="Toggle complete"
                >
                  {todo.completed && <i className="fa fa-check"></i>}
                </div>
                {editingId === todo.id ? (
                  <input
                    className="edit-input"
                    ref={editInputRef}
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    onBlur={() => finishEdit(todo.id)}
                    onKeyDown={e => {
                      if (e.key === "Enter") finishEdit(todo.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                ) : (
                  <span className="task-text">{todo.text}</span>
                )}
                {/* Priority Star */}
                <span
                  className={
                    "priority-star" + (todo.priority ? " active" : "")
                  }
                  title={
                    todo.priority
                      ? "High Priority (click to remove)"
                      : "Mark as High Priority"
                  }
                  onClick={() => togglePriority(todo.id)}
                  tabIndex={0}
                  style={{ marginLeft: 6 }}
                >
                  <i className="fa fa-star"></i>
                </span>
              </div>
              <div className="actions">
                <button
                  className="edit-btn"
                  title="Edit"
                  onClick={() => startEdit(todo)}
                  disabled={editingId === todo.id}
                >
                  <i className="fa fa-pen"></i>
                </button>
                <button
                  className="delete-btn"
                  title="Delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="todo-footer">
        <span id="task-count">
          {activeCount} task{activeCount !== 1 ? "s" : ""}
        </span>
        <button id="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}