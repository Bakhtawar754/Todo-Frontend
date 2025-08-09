import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Todo() {
  const [todos, setTodos] = useState([]); // store all todos
  const [text, setText] = useState("");   // input text
  const [editId, setEditId] = useState(null); // which todo we are editing
  const token = localStorage.getItem("token"); // auth token

  // Load todos when page opens
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos", {
      headers: { Authorization: token }
    })
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add or Edit todo
  const saveTodo = () => {
    if (!text.trim()) return alert("Enter a task");

    // If editing
    if (editId) {
      axios.put(`http://localhost:5000/api/todos/${editId}`, { text }, {
        headers: { Authorization: token }
      })
        .then(res => {
          setTodos(todos.map(t => t._id === editId ? res.data : t));
          setText("");
          setEditId(null);
        });
    }
    // If adding new
    else {
      axios.post("http://localhost:5000/api/todos", { text }, {
        headers: { Authorization: token }
      })
        .then(res => {
          setTodos([...todos, res.data]);
          setText("");
        });
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: token }
    })
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  // Mark todo as completed
  const toggleComplete = (id) => {
    axios.put(`http://localhost:5000/api/todos/${id}/toggle`, {}, {
      headers: { Authorization: token }
    })
      .then(res => setTodos(todos.map(t => t._id === id ? res.data : t)));
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

      {/* List of Todos */}
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
