import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(savedTodos);

    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    // console.log("wrapper:" + todo);
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, isCompleted: false, isEditing: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // const deleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTask = (task, id) => {
    console.log(task);

    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, task: task, isEditing: !todo.isEditing }
        : todo
    );

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  console.log(todos);

  return (
    <>
      <div className="TodoWrapper">
        <h1>Get Things Done LocalStorage!</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm task={todo} editTask={editTask} key={todo.id} />
          ) : (
            <Todo
              task={todo}
              key={todo.id}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              editTodo={editTodo}
            />
          )
        )}

        {/* <Todo task={{ task: "Hello" }} /> */}
      </div>
    </>
  );
};

export default TodoWrapperLocalStorage;
