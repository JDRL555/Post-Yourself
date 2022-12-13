import { connection } from "../database/db.js";
import bcrypt from 'bcrypt'

export const getUsers = (req, res) => {
  const sql = `SELECT * FROM users`
  connection.query(sql, (err, data)=>{
    if(!data.length){
      res.status(201).json({Message: "No users yet"})
      return
    }
    
    if(err){
      res.status(400).json({Error: err.sqlMessage})
      return
    }
    res.status(200).json(data)
  })
}

export const getUser = (req, res) => {
  const { id } = req.params
  const userRequest = `SELECT * FROM users WHERE user_id = "${id}"`
  connection.query(userRequest, (err, [userFound])=>{
    if(err){
      res.status(500).json({Error: err})
      return
    }
    if(!userFound){
      res.status(404).json({Error: "User not found"})
      return
    }
    res.status(200).json(userFound)
  })

}

export const createUser = (req, res) =>{
  const { firstName, lastName, nickName, email, password, confirmPassword } = req.body

  if(!firstName || !lastName || !nickName || !email || !password || !confirmPassword){
    res.status(400).json({Error: "Please fill in all the requered fields!"})
    return
  }
  
  if(password != confirmPassword){
    res.status(400).json({Error: "The passwords do not match!"})
    return
  }

  const emailRequest = `SELECT * FROM users WHERE user_email = "${email}";`
  connection.query(emailRequest, (err, isEmailExists)=>{
    if(isEmailExists.length != 0){
      res.status(400).json({Error: "User already exists!"})
      return
    }
    
    bcrypt.hash(password, 10, (err, hash)=>{
      if(err){ 
        res.status(400).json({Error: err}) 
        return
      } 
      const registerRequest = `INSERT INTO users(user_firstName, user_lastName, user_nickName, user_email, user_password) VALUES("${firstName}", "${lastName}", "${nickName}", "${email}", "${hash}")`
      connection.query(registerRequest, (err, data)=>{
        res.status(200).json({message: "User register sucessful!", data})
      })
    })
  })
}
