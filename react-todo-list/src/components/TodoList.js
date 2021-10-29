import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList({ todos }) {
  function sortTodo(a, b) {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  }

  return (
    <ul className={"todoList"}>
      {todos.sort(sortTodo).map((todo) => {
        return <TodoItem todo={todo}></TodoItem>;
      })}
    </ul>
  );
}