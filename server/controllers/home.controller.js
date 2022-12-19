import { connection } from "../database/db.js";

export const getPosts = async (req, res)=>{
  const [ posts ] = await connection.query(`SELECT user_nickName, post_description, post_content, post_likes FROM posts`)

  if(!posts.length){
    res.status(204).json({Empty: "No posts yet"})
    return
  } 

  res.status(200).json(posts)
}

export const createPost = async (req, res)=>{
  const { user_nickName, post_description, post_content } = req.body
  const [userData] = await connection.query(`SELECT * FROM users WHERE user_nickName = "${user_nickName}"`)

  if(!userData.length){
    res.status(404).json({Error: "User not found"})
    return
  }
  
  const user_id = userData[0].user_id  
  connection.query(`INSERT INTO posts(user_id, user_nickName, post_description, post_content) VALUES(?,?,?,?)`, [user_id, user_nickName, post_description, post_content])
  
  res.status(201).json({Message: "Post created successful!"})
}