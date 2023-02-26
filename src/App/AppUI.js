import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoContext } from "./../TodoContext";
import { Modal } from "./Modal";
import { TodoForm } from "../TodoForm";
import { TodosError } from "./TodosError";
import { TodosLoading } from "./TodosLoading";
import { EmptyTodos } from "./EmptyTodos";

function AppUI() {
  const {
    error,
    loading,
    todos,
    completeTodo,
    totalSearchTodos,
    deleteTodo,
    sercheadTodos,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <p>Encontrados: {totalSearchTodos}</p>
      <TodoList>
        {error && <TodosError />}
        {loading && <TodosLoading />}
        {!loading && !todos.length && <EmptyTodos />}
        {sercheadTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </TodoList>
      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
