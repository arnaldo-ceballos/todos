// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { AppUI } from "./AppUI";
import { TodoProvider } from "./../TodoContext";
import { TodoContext } from "./../TodoContext";

function App() {
  // Render
  return [
    <TodoProvider>
      <AppUI />
      <TodoContext.Consumer>
        {({ resetLocalStorage }) => (
          <button onClick={resetLocalStorage}>Reset localStorage</button>
        )}
      </TodoContext.Consumer>
    </TodoProvider>,
  ];
}

export default App;
