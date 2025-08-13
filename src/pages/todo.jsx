import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  // Load todos
  useEffect(() => {
    if (!token) return; // no token, no request
    axios.get("https://todo-app-01.up.railway.app/api/todos", {
      headers: { Authorization: token }
    })
    .then(res => setTodos(res.data))
    .catch(err => console.error("Error fetching todos:", err));
  }, [token]);

  // Add or Edit todo
  const saveTodo = () => {
    if (!text.trim()) return alert("Enter a task");

    if (editId) {
      // Editing
      axios.put(`https://todo-app-01.up.railway.app/api/todos/${editId}`, { text }, {
        headers: { Authorization: token }
      })
      .then(res => {
        setTodos(todos.map(t => t._id === editId ? res.data : t));
        setText("");
        setEditId(null);
      })
      .catch(err => console.error("Error updating todo:", err));
    } else {
      // Adding new
      axios.post("https://todo-app-01.up.railway.app/api/todos", { text }, {
        headers: { Authorization: token }
      })
      .then(res => {
        setTodos([...todos, res.data]);
        setText("");
      })
      .catch(err => console.error("Error adding todo:", err));
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`https://todo-app-01.up.railway.app/api/todos/${id}`, {
      headers: { Authorization: token }
    })
    .then(() => setTodos(todos.filter(t => t._id !== id)))
    .catch(err => console.error("Error deleting todo:", err));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    axios.put(`https://todo-app-01.up.railway.app/api/todos/${id}/toggle`, {}, {
      headers: { Authorization: token }
    })
    .then(res => setTodos(todos.map(t => t._id === id ? res.data : t)))
    .catch(err => console.error("Error toggling todo:", err));
  };

  return (
    <div className="todo-container">
      <div className="punch-holes" style={{ width: "300px", height: "50px" }}></div>
      <h2>To-Do List_ </h2>

      {/* Input and Button */}
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={saveTodo}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Todos */}
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo._id} className={`todo-card ${todo.completed ? "completed" : ""}`}>
            <span onClick={() => toggleComplete(todo._id)}>{todo.text}</span>
            <div className="actions">
              <button onClick={() => { setText(todo.text); setEditId(todo._id); }}>✏️</button>
              <button onClick={() => deleteTodo(todo._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
