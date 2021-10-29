import "./App.css";
import TodoList from "./components/TodoList";
import InputTodo from "./components/InputTodo";
import { useLayoutEffect, useState } from "react";
import Context from "./components/Context";
import { Get, Post, Delete, Put } from "./server";
import { apiRoute } from "./utils";

async function subscribe(setTodo) {
  try {
    const res = await Get(apiRoute.getRoute("messageLongPolling"));

    if (res.type === "DeleteTask") {
      setTodo((prev) => prev.filter((todos) => todos.id !== res.id));
    }

    if (res.type === "PutSwapTask") {
      setTodo(() => res.todoSwap);
    }

    if (res.type === "PutTask") {
      setTodo((prev) =>
        prev.map((todo) => {
          if (todo.id === res.id) {
            return {
              id: res.id,
              order: res.order,
              enter: res.enter,
              state: res.state,
            };
          }
          return todo;
        })
      );
    }

    if (res.type === "PostTask") {
      setTodo((prev) => [res, ...prev]);
    }
    await subscribe(setTodo);
  } catch (e) {
    setTimeout(() => {
      subscribe(setTodo);
    }, 1000);
  }
}

const taskDelete = async (id) => {
  try {
    await Delete(apiRoute.getRoute("task"), { id: id });
  } catch (e) {}
};

const addTaskPost = async (data, order, title) => {
  try {
    await Post(apiRoute.getRoute("task"), {
      id: data,
      order: order,
      enter: title,
      state: true,
    });
  } catch (e) {}
};

const updateTaskPut = async (todos, value) => {
  try {
    await Put(apiRoute.getRoute("task"), {
      ...todos,
      enter: value,
    });
  } catch (e) {}
};

const updateStateTodosPut = async (todos) => {
  try {
    await Put(apiRoute.getRoute("task"), {
      ...todos,
      state: !todos.state,
    });
  } catch (e) {}
};

const taskGet = async (setTodo) => {
  try {
    const res = await Get(apiRoute.getRoute("task"));
    setTodo(res.filteredTask);
  } catch (e) {}
};

const swapTodoPut = async (todoSwap) => {
  try {
    await Put(apiRoute.getRoute("swapTask"), {
      todoSwap,
    });
  } catch (e) {}
};

function App() {
  const [todos, setTodo] = useState([]);
  const [currentTodo, setCurrentTodo] = useState();

  useLayoutEffect(() => {
    taskGet(setTodo);
    subscribe(setTodo);
  }, []);

  function renameTodo(id, value) {
    setTodo(
      todos.map((todos) => {
        if (todos.id === id) {
          updateTaskPut(todos, value);
          todos.enter = value;
        }
        return todos;
      })
    );
  }

  function deleteTodo(id) {
    taskDelete(id);
    setTodo(todos.filter((todos) => todos.id !== id));
  }

  function stateTodo(id) {
    setTodo(
      todos.map((todos) => {
        if (todos.id === id) {
          updateStateTodosPut(todos);
          todos.state = !todos.state;
        }
        return todos;
      })
    );
  }

  function swapTodo(todoSwap) {
    todoSwap = todos.map((todos) => {
      if (todos.id === todoSwap.id) {
        return { ...todos, order: currentTodo.order };
      }
      if (todos.id === currentTodo.id) {
        return { ...todos, order: todoSwap.order };
      }
      return todos;
    });
    swapTodoPut(todoSwap);
  }

  return (
    <Context.Provider
      value={{
        stateTodo,
        deleteTodo,
        renameTodo,
        swapTodo,
        addTaskPost,
        setCurrentTodo,
      }}
    >
      <div className="App">
        <h1>What's the Plan for Today?</h1>
        <InputTodo />
        <TodoList todos={todos} />
      </div>
    </Context.Provider>
  );
}

export default App;
