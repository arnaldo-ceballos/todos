import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  // Inciailizacion
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  // Busqueda
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  // if (searchValue) {
  //   todos.filter((todo) =>
  //     todo.text.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  // }

  // Total de todos
  const totalTodos = todos.length;

  // Cantidad de todos completados
  const completedTodos = todos.filter((todo) => !!todo.completed).length;

  // Cantidad de todos resultado de la busqueda
  const totalSearchTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchValue.toLowerCase())
  ).length;

  // Add todos
  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  // Completar todo
  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    // console.log("index", todoIndex, todos);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    saveTodos(todos);
  };

  // Eliminar todo
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos.splice(todoIndex, 1);
    saveTodos(todos);
  };

  const resetLocalStorage = () => {
    const example = [
      { id: 1, text: "Hola Arnaldo", completed: false },
      { id: 2, text: "Chau Arnaldo", completed: false },
    ];
    localStorage.setItem("TODOS_V1", JSON.stringify(example));
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        totalSearchTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        todos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        resetLocalStorage,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
