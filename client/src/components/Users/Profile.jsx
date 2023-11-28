import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiDoorOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Profile = ({user}) => {
const [edit , setEdit] = useState(true)
const [username , setUsername] = useState("")
const [bio , setBio] = useState("")
const [userProfile , setUserProfile] = useState(user[0])

const navigate = useNavigate()


const editing = () => {
  setEdit(!edit)
  if(edit === false) {
    axios.put(`http://localhost:8080/${user[0].idUsers}`, {username : username , bio : bio }).then((res) => setUserProfile(JSON.parse(res.config.data))).catch((err) => console.log(err))
  }
}
  return (
  <>
  <header>
    <div className="navbar">
      <Link to="/" style={{textDecoration: "none" , color:"white"}}>Home </Link>
      <Link to="/AllPosts" style={{textDecoration: "none" , color:"white"}}>All Posts </Link>
      <Link to="/Profile" style={{textDecoration: "none" , color:"white"}}>Profile </Link>
    </div>
    </header>
    <div className="sidenav">
        <div className="profile">
            <img src={user[0].picture} alt="" width="100" height="100"/>

            <div className="name">
                {user[0].username}
            </div>
        </div>
    </div>
        <div className="main" >
        <h2>Profile</h2>
        <div className="card">
            <div className="card-body">
              <img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" width="36"  onClick={() => editing()} alt="" />
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                           {edit ? (<td>{userProfile.username}</td>) : (<input className="editInput" onChange={(e) => setUsername(e.target.value)}></input>)}
                        </tr>
                        <tr>
                            <td>Bio</td>
                            <td>:</td>
                            {edit ? (<td>{userProfile.bio}</td>) : (<input className="editInput" onChange={(e) => setBio(e.target.value)}></input>)}
                        </tr>
                        </tbody>
                        </table>
              <BiDoorOpen onClick={() => {localStorage.clear()
                navigate("/" , {replace: true})
              }}/>
                     </div>
                </div>
           </div>
 </>
  )
}

export default Profile