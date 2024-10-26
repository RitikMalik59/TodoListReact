import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

  const OnDragEndResponder = (result) => {
    // console.log(result);
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    // console.log("s:" + sourceIndex);
    // console.log("d:" + destinationIndex);

    const replacedTodos = todos.slice();

    const sourceValue = replacedTodos.splice(
      sourceIndex,
      1,
      todos[destinationIndex]
    );

    const destinationValue = replacedTodos.splice(
      destinationIndex,
      1,
      todos[sourceIndex]
    );

    // console.log(replacedTodos);
    setTodos(replacedTodos);
    localStorage.setItem("todos", JSON.stringify(replacedTodos));
    // console.log(todos);
  };

  // console.log(todos);

  return (
    <>
      <DragDropContext onDragEnd={OnDragEndResponder}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="TodoWrapper"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h1>Get Things Done LocalStorage!</h1>
              <TodoForm addTodo={addTodo} />
              {todos.map((todo, index) =>
                todo.isEditing ? (
                  <EditTodoForm task={todo} editTask={editTask} key={todo.id} />
                ) : (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Todo
                          task={todo}
                          key={todo.id}
                          deleteTodo={deleteTodo}
                          toggleComplete={toggleComplete}
                          editTodo={editTodo}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              )}

              {/* <Todo task={{ task: "Hello" }} /> */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TodoWrapperLocalStorage;
