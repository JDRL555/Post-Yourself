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

  const emailTest = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if(!firstName || !lastName || !nickName || !email || !password || !confirmPassword){
    res.status(400).send("Please fill in all the requered fields!")
    return
  }

  if(!emailTest.test(email)){
    res.status(400).send("Invalid email!")
    return
  }
  
  if(password != confirmPassword){
    res.status(400).send("The passwords do not match!")
    return
  }

  const [isUserExists] = await connection.query(
    `SELECT * FROM users WHERE user_email = "${email}" OR user_nickName = "${nickName}";`
  )

  if(isUserExists.length){
    res.status(400).send("User already exists!")
    return
  }
  
  bcrypt.hash(password, 10, async (err, hash)=>{
    if(err){ 
      res.status(400).send(err)
      return 
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
    res.status(400).send("Pleas fill in all the required fields!")
    return
  }

  const [userQuery] = await connection.query(`SELECT * FROM users WHERE user_nickName = '${nickName}'`)
  
  if(!userQuery.length){
    res.status(404).send("Wrong nickName or not exists!")
    return
  }

  const passwordQuery = userQuery[0].user_password

  bcrypt.compare(password, passwordQuery, async(err, result)=>{
    if(err){
      res.status(400).send(err)
      return
    }

    if(!result){
      res.status(400).send("Wrong password!")
      return
    }

    // const token = jwt.sign(nickName, process.env.SECRET_KEY)
    // res.cookie("token", String(token))
    res.cookie("aasd", "asd")
    res.status(200).send(`Welcome, ${userQuery[0].user_nickName}`)
  })

}

export const isAuthorized = async(req, res, next)=>{
  const { token } = req.headers
  console.log(req.headers)

  if(!token){
    return res.status(401).send("You don't have access to this site. Please verify you have a count and come later!")
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  console.log(decoded)
}
