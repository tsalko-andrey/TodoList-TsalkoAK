import React, { useContext } from "react";
import "./TodoItem.css";
import Context from "./Context";
import Forma from "./changeForma/Forma";

export default function TodoItem({ todo }) {
  const { deleteTodo } = useContext(Context);
  const { stateTodo } = useContext(Context);
  const { swapTodo } = useContext(Context);
  const { setCurrentTodo } = useContext(Context);
  const classState = [];

  if (todo.state === false) {
    classState.push("textFalse");
  }

  function startHandler(event, element) {
    console.log(element);
    setCurrentTodo(element);
  }

  function endHandler(event) {
    event.target.style.background = `linear-gradient(
        90deg,
        rgba(93, 12, 255, 1) 0%,
        rgba(155, 0, 250, 1) 100%
      )`;
  }

  function overHandler(event) {
    event.preventDefault();
    event.target.style.background = "lightgray";
  }

  function dropHandler(event, element) {
    swapTodo(element);
    event.target.style.background = `linear-gradient(
        90deg,
        rgba(93, 12, 255, 1) 0%,
        rgba(155, 0, 250, 1) 100%
      )`;
    event.preventDefault();
  }

  return (
    <li
      draggable="true"
      className="todoItem"
      onDragStart={(e) => startHandler(e, todo)}
      onDragLeave={(e) => {
        endHandler(e);
      }}
      onDragEnd={(e) => {
        endHandler(e);
      }}
      onDragOver={(e) => {
        overHandler(e);
      }}
      onDrop={(e) => {
        dropHandler(e, todo);
      }}
    >
      <div className={classState.join("")} onClick={() => stateTodo(todo.id)}>
        {todo.enter}
      </div>

      <div>
        <button className={"button"} onClick={() => deleteTodo(todo.id)}>
          {" "}
          Delete
        </button>
        <Forma item={todo} />
      </div>
    </li>
  );
}
