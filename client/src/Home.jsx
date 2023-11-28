import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"


const Home = ({currentUser}) => {
  const [question , setQuestion] = useState("")
  const [view , setView] = useState(false)


  const userOnUse = () => {
    if(localStorage.length===0) {
      setView(true)
    }
  }
  useEffect(() => {
    userOnUse()
  }, [])

  const addQuestion = (question) => {
    axios.post(`http://localhost:8080/${currentUser[0].idUsers}`, {question}).then((result) => console.log("post added successfully")).catch((err) => console.log("this is the error" , err))
  }

  return (
    <>
    <header>
    <div className="navbar">
      <Link to="/" style={{textDecoration: "none" , color:"white"}}>Home </Link>
      <Link to="/AllPosts" style={{textDecoration: "none" , color:"white"}}>All Posts </Link>
      {!view ? (<Link to="/Profile" style={{textDecoration: "none" , color:"white"}}>Profile </Link>) : ("")}
      {view ?  (<Link to="/Login" style={{textDecoration: "none" , color:"white"}}>Login </Link>) : ("")}
    </div>
    </header>
    <div className="questionInput">
      <h2>Do you have anything troubling your mind?</h2>
      <p>type your question here and you'll find your answer</p>
    <input type="text" placeholder="type your question here" onChange={(e) => setQuestion(e.target.value) } />
    <button onClick={()=>addQuestion(question)}>Post</button>
    </div>
    </>
  )
}

export default Home