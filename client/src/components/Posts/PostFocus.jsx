import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const PostFocus = ({onePost}) => {
  const [comments , setComments] = useState([])
// console.log(onePost.idPosts)
  const fetchComments =() => {
    axios.get(`http://localhost:8080/AllPosts/OnePost/${onePost.idPosts}`).then((res) => setComments(res.data)).catch((err) => console.log("this is the error" , err))
  } 
  useEffect(() => {
    fetchComments()
  }, [])
  return (
    <>
      <header>
    <div className="navbar">
      <Link to="/" style={{textDecoration: "none" , color:"white"}}>Home </Link>
      <Link to="/AllPosts" style={{textDecoration: "none" , color:"white"}}>All Posts </Link>
      <Link to="/Profile" style={{textDecoration: "none" , color:"white"}}>Profile </Link>
      <Link to="/Login" style={{textDecoration: "none" , color:"white"}}>Login </Link>
    </div>
    </header>
    <div className="onePost">
      <h3>{onePost.question}</h3>
    </div>
    <div className="comments">
    {comments.map((comment) => {
     return <p>{comment.comment}</p>
    })}
    </div>
    </>
  )
}

export default PostFocus