import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/todo/${id}`, {
        method: "DELETE",
      });
      console.log(res);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {}
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
