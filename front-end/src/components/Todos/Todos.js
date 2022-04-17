import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import TodoAction from "../TodoAction/TodoAction";
import { useQuery } from "@apollo/client";
import { getTodos } from "../../graphql/queries";
function Todos() {
  const { data, loading, error } = useQuery(getTodos);
  const [dataTodo, setDataTodo] = useState({
    //init data 1 task on time data loading form useQuery
    todos: [{ id: 1, description: "Hello World", isFinished: false }],
  });
  // set dataTodo when useQuery response data
  useEffect(() => {
    if (data !== undefined) {
      setDataTodo(data);
    }
  }, [data]);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  return (
    <div className="todos">
      {dataTodo.todos.map((todo) => (
        <Todo
          completed={todo.isFinished}
          description={todo.description}
          id={todo.id}
          key={todo.id}
        />
      ))}
      <TodoAction dataTodo={dataTodo} data={data} setDataTodo={setDataTodo} />
    </div>
  );
}

export default Todos;
