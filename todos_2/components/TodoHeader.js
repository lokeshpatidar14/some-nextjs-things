"use client";

import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoHeader = () => {
  const [showForm, setShowForm] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        console.error("Failed to fetch todos");
        return;
      }
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodoHandler = async (todoData) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      console.error("Failed to add todo");
      return;
    }
    const id = await response.json();
    setTodos((prevTodos) => [...prevTodos, { ...todoData, _id: id }]);
  };

  const editTodoHandler = async (id, newText) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    if (!response.ok) {
      console.error("Failed to edit todo");
      return;
    }
    const result = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const deleteTodoHandler = async (id) => {
    const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Failed to delete todo");
      return;
    }
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const toggleCompleteHandler = async (id, completed) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      console.error("Failed to toggle complete status");
      return;
    }
    const result = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed } : todo
      )
    );
  };

  const toggleViewHandler = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div>
      <h1>Todo Manager</h1>
      <button onClick={toggleViewHandler}>
        {showForm ? "View Todos" : "Add Todo"}
      </button>
      {showForm ? (
        <TodoForm onAddTodo={addTodoHandler} />
      ) : (
        <TodoList
          todos={todos}
          onEditTodo={editTodoHandler}
          onDeleteTodo={deleteTodoHandler}
          onToggleComplete={toggleCompleteHandler}
        />
      )}
    </div>
  );
};

export default TodoHeader;
