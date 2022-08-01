import React from 'react'
import axios from 'axios';
import {useState} from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3002/",{userName,password}).then(response => {
        console.log(response);
        })
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
      <Link to={{ pathname: "/" }}>Login</Link>
    </div>
  )
}

export default Register
