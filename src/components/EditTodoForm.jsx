import React, { useState } from "react";

const EditTodoForm = ({ editTask, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EditTodoForm: " + value);
    if (value) {
      editTask(value, task.id);

      setValue("");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Update task here.."
        onChange={(e) => {
          // console.log(e.target.value);
          setValue(e.target.value);
        }}
        value={value}
      />

      <button type="submit" className="todo-btn">
        Update Todo
      </button>
    </form>
  );
};

export default EditTodoForm;
