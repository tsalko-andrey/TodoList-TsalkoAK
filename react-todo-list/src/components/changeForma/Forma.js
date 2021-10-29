import React, { useContext, useState } from "react";
import "./Forma.css";
import Context from "../Context";

export default function Forma({ item }) {
  const [modelState, setModelState] = useState(false);
  const [value, setValue] = useState(item.enter);
  const { renameTodo } = useContext(Context);

  function Submit(event) {
    event.preventDefault();
    if (value.trim() !== "") {
      event.preventDefault();
      renameTodo(item.id, value);
      setModelState(false);
    }
  }

  return (
    <React.Fragment>
      <button className="form-botton" onClick={() => setModelState(true)}>
        rename
      </button>

      {modelState && (
        <div
          ondragstart="return false;"
          ondrop="return false;"
          className="forma"
        >
          <div className="forma-body">
            <form onSubmit={Submit}>
              <label>
                <input
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="todo-input"
                />
              </label>
              <div>
                <input className="form-botton" type="submit" value="изменить" />
                <button
                  className="form-botton"
                  onClick={() => setModelState(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}