import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { toast } from "react-toastify";
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
      await fetch(`http://localhost:5000/dashboard/todo/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      toast.success("Deleted Successfully");
    } catch (err) {
      console.error(err.message);
    }
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
