import { connection } from "../database/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const getUsers = async (req, res) => {
  const [data] = await connection.query(`SELECT * FROM users`)

  if(!data.length){
    res.status(201).json({Message: "No users yet"})
    return
  }
  
  res.status(200).json(data)
}

export const getUser = async (req, res) => {
  const id = req.headers.userid
  const [userFound] = await connection.query(`SELECT * FROM users WHERE user_id = "${id}"`)
  
  if(!userFound.length){
    res.status(404).json({Error: "User not found"})
    return
  }
  res.status(200).json(userFound[0])

}

export const createUser = async (req, res) =>{
  const { firstName, lastName, nickName, email, password, confirmPassword } = req.body

  const emailTest = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if(!firstName || !lastName || !nickName || !email || !password || !confirmPassword){
    return res.status(400).json({message: "Please fill in all the requered fields!"})
  }

  if(!emailTest.test(email)){
    return res.status(400).send("Invalid email!")
  }
  
  if(password != confirmPassword){
    return res.status(400).send("The passwords do not match!")
  }

  const [isUserExists] = await connection.query(
    `SELECT * FROM users WHERE user_email = "${email}" OR user_nickName = "${nickName}";`
  )

  if(isUserExists.length){
    return res.status(400).json({message: "User already exists!"})
  }
  
  bcrypt.hash(password, 10, async (err, hash)=>{
    if(err){ 
      return res.status(400).send(err)
    } 
    await connection.query(
      `INSERT INTO users(user_firstName, user_lastName, user_nickName, user_email, user_password) VALUES(?,?,?,?,?)`,[firstName, lastName, nickName, email, hash]
    )

    res.status(201).send("User register sucessful!")
  })
}

export const loginUser = async(req, res)=>{
  const { nickName, password } = req.body

  if(!nickName || !password){
    return res.status(400).json({message: "Pleas fill in all the required fields!"})
  }

  const [userQuery] = await connection.query(`SELECT * FROM users WHERE user_nickName = '${nickName}'`)
  
  if(!userQuery.length){
    return res.status(404).json({message: "Wrong nickName or not exists!"})
  }

  const passwordQuery = userQuery[0].user_password

  bcrypt.compare(password, passwordQuery, async(err, result)=>{
    if(err){
      return res.status(400).json({err})
    }

    if(!result){
      return res.status(400).json({message: "Wrong password!"})
    }

    const userId = userQuery[0].user_id
    console.log(userId)

    const token = jwt.sign({userId, nickName}, process.env.SECRET_KEY)
    console.log(token)
    res.status(200).json({
      message: `Accessing...`,
      token
    })
  })

}