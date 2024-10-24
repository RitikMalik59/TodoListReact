import React, { useState } from "react";
import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
import TodoWrapperLocalStorage from "./components/TodoWrapperLocalStorage";

function App() {
  return (
    <>
      <div className="App">
        <TodoWrapper />
        <TodoWrapperLocalStorage />
      </div>
    </>
  );
}

export default App;
