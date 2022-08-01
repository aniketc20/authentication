import React from 'react'
import axios from 'axios';
import {useState} from "react";
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { TextField, Box } from '@mui/material';
import PaginationTable from "./components/PaginationTable";
import styles from "./styles/style.css";
import Modal from 'react-modal';

export default function Login(props) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  var [jwtToken, setToken] = useState("");
  const [jwtState, setjwtState] = useState('false')
  var [rows, setRowData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("")
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '70%'
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // let navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post("http://localhost:3002/login",{userName,password})
        .then(response => {
          if(response.data) {
            setToken(response.data)
            setjwtState('true')
            setMessage("")
          }
          else {
            setMessage("please login")
          }
          // if(response.data==='valid') {
          //   navigate("/dash");
          // }
        })
  }

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = jwtToken
    await axios.get("http://localhost:3002/")
      .then(response => {
        console.log(response.data)
        setRowData(response.data)
        setIsOpen(true);
      })
      .catch(error => {
        console.log(error)
        setMessage("please login to view data")
      })
  }


  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 3px',
  });
  return (
    <div>
      {/* <h1>Hello, {props.name}</h1> */}
      <style>
        {"body {background: linear-gradient(90deg, rgba(0,81,85,1) 4%, rgba(9,70,121,1) 27%, rgba(3,114,190,1) 68%)"}
      </style>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <main className={styles.container}>
      <div className={styles.wrapper}>
      <PaginationTable data={rows} rowsPerPage={5} />
      </div>
      </main>
      </Modal>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 5,
            background: 'white',
            boxShadow: 3,
            borderRadius: 2,
            flexDirection: 'column',
            marginX: '30%',
            marginY: '5%',
            gap: 2
          }}
        >
        <Box sx={{ fontFamily: 'default', fontSize: 32, fontWeight: 'bold' }}>
          Login
        </Box>
        <TextField 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
          id="username" label="Username" variant="outlined" size='small'
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            zIndex: 0
          }} />
        <TextField 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          id="password" label="Password" variant="outlined" size='small' 
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            zIndex: 0
          }}
          />

        <MyButton variant="contained" type='submit'>Login</MyButton>
        
          {/* <Link to={{ pathname: "/register" }} style={{ textDecoration: 'none', color: 'white' }}>
            <Button variant="contained" sx={{ width: "100%" }}>Register</Button>
          </Link> */}
          <Button onClick={getData} variant="contained" sx={{ width: "100%" }}>Get data</Button>
          {message}
          <br></br>
          JwtToken received: {jwtState}
        </Box>
      </form>
    </div>
  )
}
