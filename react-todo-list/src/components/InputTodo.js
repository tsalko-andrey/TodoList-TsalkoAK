import React, { useState, useContext } from "react";
import Context from "./Context";
import "./InputTodo.css";

export default function InputTodo() {
  const { addTaskPost } = useContext(Context);
  const [value, setValue] = useState("");

  function Submit(event) {
    event.preventDefault();
    if (value.trim() !== "") {
      event.preventDefault();
      addTaskPost(Date.now(), Date.now() + 1, value);
      setValue("");
    }
  }

  return (
    <form onSubmit={Submit}>
      <label>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="todo-input"
        />
      </label>
      <input type="submit" value="ADD" className="todo-button" />
    </form>
  );
}
