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

  // Total de todos
  const totalTodos = todos.length;

  // Cantidad de todos completados
  const completedTodos = todos.filter((todo) => !!todo.completed).length;

  // Filtrado de la lista de todos
  let sercheadTodos = [];
  if (searchValue.length === 0) {
    sercheadTodos = todos;
  } else {
    sercheadTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  console.log(sercheadTodos);
  const totalSearchTodos = sercheadTodos.length;

  // Add todos
  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      id: todos.length + 1,
      text,
      completed: false,
    });
    saveTodos(newTodos);
  };

  // Completar todo
  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    console.log("index", todoIndex, todos);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  // Eliminar todo
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
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
        sercheadTodos,
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
