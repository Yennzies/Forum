import React, { useState } from "react";
import "./Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [register , setRegister] = useState(false)
  const [username , setUsername ] = useState("")
  const [password , setPassword ] = useState("")
  const [picture , setPicture ] = useState("")

  const navigate = useNavigate()

  const changeToSignUp = () => {
      setRegister(true)
  }

  const addUser = (username,password,picture) => {
    axios.post("http://localhost:8080/Login" , {username :username,password : password,picture : picture}).then((res) => console.log("user added successfully")).catch((err) => console.log("this is the error", err))
  }

  const addtoLocalStorage = (username) => {
    console.log(localStorage)
    localStorage.setItem("username" , JSON.stringify(username))
  }
  
  return ( 
   <div id="Login">
{!register ? ( <div className="center">
    <h1>Login</h1>
    <form method="post">
      <div className="txt_field">
        <input type="text" required onChange={(e) => setUsername(e.target.value)} />
        <span></span>
        <label>Username</label>
      </div>
      <div className="txt_field">
        <input type="password" required onChange={(e) => setPassword(e.target.value)} />
        <span></span>
        <label>Password</label>
      </div>
      <div className="pass">Forgot Password?</div>
      <input type="submit" value="Login" onClick={() => {addtoLocalStorage(username)
        navigate("/", {replace: true})}}/>
      <div className="signup_link">
        Not a member? <a onClick={() =>changeToSignUp()}>Signup</a>
      </div>
    </form>
  </div>) : (<div className="center">
    <h1>Sign Up</h1>
    <form method="post">
      <div className="txt_field">
        <input type="text" required onChange={(e) => setUsername(e.target.value)}/>
        <span></span>
        <label>Username</label>
      </div>
      <div className="txt_field">
        <input type="password" required onChange={(e) => setPassword(e.target.value)} />
        <span></span>
        <label>Password</label>
      </div>
      <div className="txt_field">
        <input type="text" required onChange={(e) => setPicture(e.target.value)} />
        <span></span>
        <label>Picture</label>
      </div>
      <input type="submit" value="Sign Up" onClick={(e)=>{
        addtoLocalStorage(username)
         addUser(username,password,picture)
        navigate("/", {replace : true})
         }}/>
    </form>
  </div>)
  }
    
   </div>
   
  )
}

export default Login;