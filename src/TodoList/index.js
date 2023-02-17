import React from "react";

function TodoList(props) {
  return (
    <section>
      <ul>{props.children}</ul>
      <h4>Hide completed tasks</h4>
    </section>
  );
}

export { TodoList };
