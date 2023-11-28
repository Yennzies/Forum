import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PostFocus from "./PostFocus";

const OnePost = ({data , users, getonePost}) => {
const navigate = useNavigate()
  let oneImage = users.filter((user) => user.idUsers === data.userFid )
  // console.log(oneImage)

  return (
    <div className="onePost" onClick={() => {getonePost(data)
      navigate('/AllPosts/OnePost', {replace:true})}}>
      <h3>{data.question}</h3>
    </div>
  )
}


export default OnePost