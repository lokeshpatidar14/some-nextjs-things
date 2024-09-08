"use client";

import React from "react";

const CompletedList = ({ todos, onEditTodo, onDeleteTodo, onToggleComplete }) => {
  return (
    <div>
      <h2>Completed Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo._id, !todo.completed)}
            />
            <span>{todo.text}</span>
            <button onClick={() => onEditTodo(todo._id, prompt("New text:", todo.text))}>Edit</button>
            <button onClick={() => onDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedList;
