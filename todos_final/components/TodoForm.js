"use client";

import React, { useRef } from "react";
import Layout from "./Layout/Layout";

const TodoForm = ({ onAddTodo }) => {
  const todoInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredTodo = todoInputRef.current.value;
    if (enteredTodo.trim() === "") {
      return;
    }

    const todoData = { text: enteredTodo, completed: false };
    await onAddTodo(todoData);

    todoInputRef.current.value = "";
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={todoInputRef} placeholder="Enter a new todo" />
        <button type="submit">Add</button>
      </form>
    </Layout>
  );
};

export default TodoForm;
