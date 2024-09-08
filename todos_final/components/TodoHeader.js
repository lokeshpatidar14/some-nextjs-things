"use client";

import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList"; 

const TodoHeader = () => {
  const [showForm, setShowForm] = useState(true);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        console.error("Failed to fetch todos");
        return;
      }
      const data = await response.json();
      setTodos(data.filter((todo) => !todo.completed));
      setCompletedTodos(data.filter((todo) => todo.completed));
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
    const todoToUpdate =
      todos.find((todo) => todo._id === id) ||
      completedTodos.find((todo) => todo._id === id);
    if (!todoToUpdate) return;

    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newText,
        completed: todoToUpdate.completed,
      }),
    });
    if (!response.ok) {
      console.error("Failed to edit todo");
      return;
    }
    const result = await response.json();
    if (todoToUpdate.completed) {
      setCompletedTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, text: newText } : todo
        )
      );
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  const deleteTodoHandler = async (id) => {
    const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Failed to delete todo");
      return;
    }
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    setCompletedTodos((prevTodos) =>
      prevTodos.filter((todo) => todo._id !== id)
    );
  };

  const toggleCompleteHandler = async (id, completed) => {
    const todoToUpdate =
      todos.find((todo) => todo._id === id) ||
      completedTodos.find((todo) => todo._id === id);
    if (!todoToUpdate) return;

    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: todoToUpdate.text, completed }),
    });

    if (!response.ok) {
      console.error("Failed to toggle complete status");
      return;
    }

    if (completed) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setCompletedTodos((prevTodos) => [
        ...prevTodos,
        { ...todoToUpdate, completed },
      ]);
    } else {
      setCompletedTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== id)
      );
      setTodos((prevTodos) => [...prevTodos, { ...todoToUpdate, completed }]);
    }
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
        <>
          <TodoList
            todos={todos}
            onEditTodo={editTodoHandler}
            onDeleteTodo={deleteTodoHandler}
            onToggleComplete={toggleCompleteHandler}
          />
          <CompletedList
            todos={completedTodos}
            onEditTodo={editTodoHandler}
            onDeleteTodo={deleteTodoHandler}
            onToggleComplete={toggleCompleteHandler}
          />
        </>
      )}
    </div>
  );
};

export default TodoHeader;

// import { useState, useEffect } from "react";
// import TodoForm from "./TodoForm";
// import TodoList from "./TodoList";

// const TodoHeader = () => {
//   const [showForm, setShowForm] = useState(true);
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       const response = await fetch("/api/todos");
//       if (!response.ok) {
//         console.error("Failed to fetch todos");
//         return;
//       }
//       const data = await response.json();
//       setTodos(data);
//     };
//     fetchTodos();
//   }, []);

//   const addTodoHandler = async (todoData) => {
//     const response = await fetch("/api/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(todoData),
//     });
//     if (!response.ok) {
//       console.error("Failed to add todo");
//       return;
//     }
//     const id = await response.json();
//     setTodos((prevTodos) => [...prevTodos, { ...todoData, _id: id }]);
//   };

//   const editTodoHandler = async (id, newText) => {
//     const todoToUpdate = todos.find(todo => todo._id === id);
//     if (!todoToUpdate) return;

//     const response = await fetch(`/api/todos/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: newText, completed: todoToUpdate.completed }),
//     });

//     if (!response.ok) {
//       console.error("Failed to edit todo");
//       return;
//     }

//     const result = await response.json();
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo._id === id ? { ...todo, text: newText } : todo
//       )
//     );
//   };

//   const deleteTodoHandler = async (id) => {
//     const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
//     if (!response.ok) {
//       console.error("Failed to delete todo");
//       return;
//     }
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
//   };

//   const toggleCompleteHandler = async (id, completed) => {
//     const todoToUpdate = todos.find(todo => todo._id === id);
//     if (!todoToUpdate) return;

//     const response = await fetch(`/api/todos/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: todoToUpdate.text, completed }),
//     });

//     if (!response.ok) {
//       console.error("Failed to toggle complete status");
//       return;
//     }

//     const result = await response.json();
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo._id === id ? { ...todo, completed } : todo
//       )
//     );
//   };

//   const toggleViewHandler = () => {
//     setShowForm((prevShowForm) => !prevShowForm);
//   };

//   return (
//     <div>
//       <h1>Todo Manager</h1>
//       <button onClick={toggleViewHandler}>
//         {showForm ? "View Todos" : "Add Todo"}
//       </button>
//       {showForm ? (
//         <TodoForm onAddTodo={addTodoHandler} />
//       ) : (
//         <TodoList
//           todos={todos}
//           onEditTodo={editTodoHandler}
//           onDeleteTodo={deleteTodoHandler}
//           onToggleComplete={toggleCompleteHandler}
//         />
//       )}
//     </div>
//   );
// };

// export default TodoHeader;
