import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./comment";


const PostFocus = ({onePost, oneUser, currentUser}) => {
  const [comments , setComments] = useState([])
  const [view , setView] = useState(false)
  const [comment , setComment] = useState("")


const createComment =(comment) => {
  axios.post(`http://localhost:8080/AllPosts/OnePost/${currentUser[0].idUsers}/${onePost.idPosts}`,{comment : comment}).then((res) => console.log("comment added successfully")).catch((err) => console.log(err))
}

  const fetchComments =() => {
    axios.get(`http://localhost:8080/AllPosts/OnePost/${onePost.idPosts}` ).then((res) => setComments(res.data)).catch((err) => console.log("this is the error" , err))
  } 

  const userOnUse = () => {
    if(localStorage.length===0) {
      setView(true)
    }
  }

  useEffect(() => {
    userOnUse()
    fetchComments()
  }, [])
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
    <div className="post">
      <h2>made By : {oneUser[0].username}</h2>
      <h3>{onePost.question}</h3>
    </div>
    <div className="comment-session">
    {comments.map((comment) => {
     return <Comment data={comment} key={comment.idComments} oneUser={oneUser} />
    })}
       <div className="comment-box">
         <div className="user">
      <div className="image"><img src={currentUser[0].picture} alt="404" /></div>
      <div className="name">{currentUser[0].username}</div>
         </div>
      <form action="" method="post">
        <textarea name="comment"  placeholder="your message" onChange={(e) => setComment(e.target.value)}></textarea>
        <button className="comment-submit" onClick={(e) => {e.preventDefault()
          createComment(comment)}}>Comment</button>
      </form>
         </div>
    </div>
    </>
  )
}

export default PostFocus