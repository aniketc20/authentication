// import axios from 'axios';
// import {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login name="Props being passed" />} />
        <Route path="register" element={<Register />} />
        <Route path="dash" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
