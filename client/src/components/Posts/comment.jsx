import axios from "axios";
import React, { useEffect, useState } from "react";


const Comment = ({data, oneUser}) => {
  const[user , setUser] = useState(oneUser[0])

  

  const fetchUserData = () => {
    axios.get(`http://localhost:8080/AllPosts/OnePost/Comment/`).then((res) => { let newarr = res.data.filter((user) => data.idComments === user.idComments)
      setUser(newarr[0])})
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchUserData()
  },[])
  
  return (
    <div className="comments">
    <div className="list">
    <div className="user">
      <div className="user-image"><img src={user.picture} alt="" /></div>
      <div className="user-meta">
        <div className="name">{user.username}</div>
        <div className="day">{data.created_at}</div>
      </div>
      <div className="comment-post">{data.comment}</div>
    </div>
    </div>
    </div>
  )
}

export default Comment