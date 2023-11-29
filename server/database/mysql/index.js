const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'forum'
})

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!')
  }
});

// Your Database Queries Here!!
const createPost =  (post, id) => {
  const sql = `insert into posts(question,created_at,userFid) values(?,?,?)`
  const date = new Date();
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`
  // console.log(sql)
  return  connection.query(sql, [post,currentDate,id])
}

const getAllPosts = (callback) => {
  const sql = "select * from posts"
  return connection.query(sql , (err , results) => {
    callback(err , results)
  })
}

const createComment = (callback, comment , userid, postid) => {
  const sql = "insert into comments(comment, likes,created_at,postFid,userFid) values (?,?,?,?,?)"
  const date = new Date();
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`
  connection.query(sql , [comment,0,currentDate,postid,userid], (err, results) => {
    callback(err ,results)
  })
}

const getAllCommentsForPost = (callback , id) => {
  const sql = "select * from comments where postFid = ?"
  connection.query(sql , [id] , (err , results)=> {
    callback(err,results)
  } )
}

const getAllUsers = (callback) => {
  const sql ="select * from users"
  connection.query(sql , (err ,results) => {
    callback(err ,results)
  })
}

const addUser = (callback , username , password , picture ) => {
  const sql = "insert into users (username , password , picture, joined_at ) values (?,?,?,?)"
  const date = new Date();
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`
  connection.query(sql , [username,password,picture,currentDate] , (err , results) => {
    callback(err , results)
  })
}

const getOneUser = (callback , username) => {
  const sql = "select * from users u where u.username = ? "
  connection.query(sql, [username] , (err , results) => {
    callback(err,results)
  })
}

const updateUser = (callback , username , bio , id) => {
  const sql = "update users set username = ? , bio = ? where idUsers = ? "
  connection.query(sql , [username , bio , id] , (err , results) => {
    callback(err , results)
  })
}

const getUserByComment = (callback ) => {
  const sql = "select * from users inner join comments on users.idUsers = comments.userFid ;"
  connection.query(sql , (err , result) => {
    callback(err , result)
  })
}



// Don't forget to export your functions!
module.exports = {
  createPost,
  getAllPosts,
  createComment,
  getAllCommentsForPost,
  getAllUsers,
  addUser,
  getOneUser,
  updateUser,
  getUserByComment,
};
