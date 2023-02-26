import React from "react";

function TodoList(props) {
  return (
    <section>
      <ul>{props.children}</ul>
      <h4>Funcionalidad para ocultar los todo completados</h4>
    </section>
  );
}

export { TodoList };
