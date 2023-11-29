import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState , useEffect} from "react";
import axios from "axios";
import Home from "./Home.jsx";
import AllPosts from "./components/Posts/Allposts.jsx";
import Login from "./components/Users/Login.jsx";
import Profile from "./components/Users/Profile.jsx";
import PostFocus from "./components/Posts/PostFocus.jsx";
function App() {
  const [users , setUsers] = useState([])
  const [onePost , setOnePost] = useState([])
  const [currentUser , setCurrentUser] = useState([])
  const [oneUser , setOneUser] = useState([])

  const getUsers = () => {
    axios.get("http://localhost:8080/").then((res) => setUsers(res.data)).catch((err) => console.log("this is the error", err))
  }

  const getonePost = (data, userPost) => {
    setOnePost(data)
    setOneUser(userPost)
  }
  const getOneUser = () => {
    let username = JSON.parse(localStorage.getItem("username"))
    axios.get(`http://localhost:8080/${username}`).then((res) => setCurrentUser(res.data)).catch((err) => console.log("this is the error" , err))
  }
  useEffect(() => {
    console.log(currentUser[0])
    getUsers()
    getOneUser()
  },[])
  
  return (
  <>
   <div className="navBar">
   <BrowserRouter>
      <Routes>
           <Route  path="/" element={<Home currentUser={currentUser}/>}/>
          <Route path="/AllPosts" element={<AllPosts users = {users} getonePost={getonePost} currentUser={currentUser} />}/>
          <Route path="/Profile" element={<Profile user={currentUser} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AllPosts/OnePost" element={<PostFocus onePost={onePost} oneUser={oneUser} currentUser={currentUser}/>}/>
      </Routes>
    </BrowserRouter>
   
   </div>
  </>)
}

export default App;
