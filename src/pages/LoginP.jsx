import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginP = () => {
  const navigate = useNavigate();

 

  const [user, setUser] = useState({ username: "", password: "" });

  const login = (e) => {
    e.preventDefault();
    console.log(user);

    if (user.username === "Saloxiddin" && user.password === "2302") {
      navigate("/debts");
    } else {
      alert("Error !!!");
    }
  };
 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form className="form-2">
        <input
          type="text"
          name="username"
          value={user.username}
       
          onChange={handleChange}
          placeholder="username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />
        <br />
        <button type="submit" className="btn btn-success p-3" onClick={login}>
          LoginP
        </button>
      </form>
    </div>
  );
};

export default LoginP;
