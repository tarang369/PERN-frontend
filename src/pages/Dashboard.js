import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import List from "../components/ListTodo";
import { toast } from "react-toastify";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
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
          <span className='user'>
            <AiOutlineUser className='user-info' />
            Welcome,
            <h5>{name}</h5>
          </span>
          <button className='btn btn-secondary' onClick={(e) => Logout(e)}>
            <span>
              LOG
              <AiOutlineLogout style={{ fontSize: "x-large" }} />
              UT
            </span>
          </button>
        </div>
      </div>
      <div className='container'>
        <h1 className='text-center my-5'>Todos</h1>
        <List />
      </div>
    </>
  );
};

export default Dashboard;
