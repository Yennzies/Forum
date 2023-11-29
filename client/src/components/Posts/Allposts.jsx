import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OnePost from "./OnePost";
import axios from "axios";


const AllPosts = ({users, getonePost}) => {
  const [posts, setPosts] = useState([])
  const [view , setView] = useState(false)

  const fetch = () => {
    axios.get("http://localhost:8080/AllPosts").then((response) => setPosts(response.data)).catch((err) => console.log("this is the error", err))
  }

  const userOnUse = () => {
    if(localStorage.length===0) {
      setView(true)
    }
  }


  useEffect(() => {
    fetch()
    userOnUse()
  },[])


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
    <div className="allPosts">
       <h1 style={{textAlign:"center"}}>Other Questions you might be interested in</h1>
     {posts.map((post) => {
       let userPost = users.filter((user) => user.idUsers === post.userFid)
       return <div className="container">
        <img src={userPost[0].picture} alt="404" />
      <p>Question Posted by : {userPost[0].username}</p>
      <OnePost data ={post} key={post.idPosts} users = {users} getonePost={getonePost}  />
      </div>
     })}
    </div>
      </>
  )
}

export default AllPosts