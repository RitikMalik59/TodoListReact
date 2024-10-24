import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // console.log("wrapper:" + todo);
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, isCompleted: false, isEditing: false },
    ]);
  };

  // const deleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  console.log(todos);

  return (
    <>
      <div className="TodoWrapper">
        <h1>Get Things Done !</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo) => (
          <Todo
            task={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
        {/* <Todo task={{ task: "Hello" }} /> */}
      </div>
    </>
  );
};

export default TodoWrapper;
