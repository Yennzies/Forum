const express = require("express");
const cors = require("cors");
const {createPost , getAllPosts, createComment, getAllCommentsForPost, getAllUsers, addUser, getOneUser, updateUser} = require("./database/mysql/index.js")
const db = require('./database/mysql/index.js');


const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/AllPosts",  (req, res) => {
  getAllPosts((err , results) =>{
    if(err) res.status(400).send("this is the error", err)
    else res.status(200).json(results)
  })
});

app.post("/Login" , (req , res) => {
  let {username , password , picture} = req.body
  addUser((err , results) => {
    if (err) res.status(500).send(err)
    else res.status(201).send("user added successfully")
  }, username , password , picture)
})

app.post("/:id" , async (req , res) => {
  let {id} = req.params
  let {question} = req.body
  try{
     createPost(question, id)
    res.status(201).send("post added")
  }catch(err){
    res.status(500).send("this is the error" , err)
  }
})

app.post("/AllPosts/OnePost/:id1/:id2", (req , res) => {
  let {id1 , id2} = req.params
  let {comment} = req.body
  createComment((err , results) =>{
    if(err) res.status(500).send(err)
    else res.status(201).send("comment added successfully")
  },comment,id1,id2)
})

app.get("/AllPosts/OnePost/:id", (req , res) =>{
  let {id} = req.params
  getAllCommentsForPost((err , results) => {
    if(err) res.status(500).send(err)
    else res.status(200).json(results)
  }, id)
} )

app.get("/" , (req , res) => {
getAllUsers((err , results) => {
  if(err) res.status(500).send(err)
  else res.status(200).json(results)
})
})

app.get("/:username" , (req,res)=> {
  let {username} = req.params 
  getOneUser((err , results) => {
    if(err) res.status(500).send(err)
    else res.status(200).json(results)
  }, username)
} )

app.put("/:id" , (req , res) => {
  let {id} = req.params
  let {username , bio} = req.body
  updateUser((err , results) => {
    if(err) res.status(500).send(err)
    else res.status(200).json(results)
  }, username , bio , id)
})


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
