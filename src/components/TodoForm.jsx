import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("todoForm: " + value);
    if (value) {
      addTodo(value);

      setValue("");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What's your task today"
        onChange={(e) => {
          // console.log(e.target.value);
          setValue(e.target.value);
        }}
        value={value}
      />

      <button type="submit" className="todo-btn">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
