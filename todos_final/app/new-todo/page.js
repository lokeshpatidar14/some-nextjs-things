"use client";

import TodoForm from "@/components/TodoForm";

export default function NewTodoPage() {
  const addTodoHandler = async (todoData) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      
      const result = await response.json();
      console.log("Todo added:", result);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <h1>New Todo</h1>
      <TodoForm onAddTodo={addTodoHandler} />
    </div>
  );
}
