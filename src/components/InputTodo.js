import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      toast.success("Added Successfully");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Fragment>
      <h1 className='text-center my-5'>Todos</h1>
      <form className='d-flex' onSubmit={onSubmitForm}>
        <input
          type='text'
          className='form-control'
          value={description}
          placeholder='Add a Todo'
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>+</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
