import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faFilePen } from "@fortawesome/free-solid-svg-icons";

const todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  // console.log("Todo: " + task.task);

  return (
    <div className="Todo">
      <div class="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id={task.id}
          value={task.id}
          checked={task.isCompleted}
          onClick={() => toggleComplete(task.id)}
        />
        <label className="form-check-label" htmlFor={task.id}>
          <p
            className={task.isCompleted ? "completed" : "incompleted"}
            onClick={() => toggleComplete(task.id)}
          >
            {task.task}
          </p>
        </label>
      </div>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faFilePen}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrashCan}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};

export default todo;
