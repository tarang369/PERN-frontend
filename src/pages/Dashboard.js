import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Input from "../components/InputTodo";
import List from "../components/ListTodo";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  async function getName() {
    try {
      const respose = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await respose.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getName();
  }, []);
  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.warn("Logged Out Successfully");
  };
  return (
    <>
      <div className='top-bar'>
        <h1>DashBoard</h1>
        <div>
          <h5>Welcome,{name}</h5>
          <button className='btn btn-info' onClick={(e) => Logout(e)}>
            LogOut..
          </button>
        </div>
      </div>
      <div className='container'>
        <Input />
        <List />
      </div>
    </>
  );
};

export default Dashboard;
