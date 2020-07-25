import React, { Fragment } from "react";
import "./App.css";
import Input from "./components/InputTodo";
import List from "./components/ListTodo";

function App() {
  return (
    <Fragment>
      <div className='container'>
        <Input />
        <List />
      </div>
    </Fragment>
  );
}

export default App;
