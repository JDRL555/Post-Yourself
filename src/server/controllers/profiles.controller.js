import { connection } from "../database/db.js";
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
  const [data] = await connection.query(`SELECT * FROM users`)

  if(!data.length){
    res.status(201).json({Message: "No users yet"})
    return
  }
  
  res.status(200).json(data)
}

export const getUser = async (req, res) => {
  const { id } = req.params
  const [userFound] = await connection.query(`SELECT * FROM users WHERE user_id = "${id}"`)
  
  if(!userFound.length){
    res.status(404).json({Error: "User not found"})
    return
  }
  res.status(200).json(userFound[0])

}

export const createUser = async (req, res) =>{
  const { firstName, lastName, nickName, email, password, confirmPassword } = req.body

  if(!firstName || !lastName || !nickName || !email || !password || !confirmPassword){
    res.status(400).json({Error: "Please fill in all the requered fields!"})
    return
  }
  
  if(password != confirmPassword){
    res.status(400).json({Error: "The passwords do not match!"})
    return
  }

  const [isUserExists] = await connection.query(
    `SELECT * FROM users WHERE user_email = "${email}" OR user_nickName = "${nickName}";`
  )

  if(isUserExists.length){
    res.status(400).json({Error: "User already exists!"})
    return
  }
  
  bcrypt.hash(password, 10, async (err, hash)=>{
    if(err){ 
      res.status(400).json({Error: err}) 
      return
    } 
    await connection.query(
      `INSERT INTO users(user_firstName, user_lastName, user_nickName, user_email, user_password) VALUES(?,?,?,?,?)`,[firstName, lastName, nickName, email, hash]
    )
    res.status(201).json({message: "User register sucessful!"})
  })
}
