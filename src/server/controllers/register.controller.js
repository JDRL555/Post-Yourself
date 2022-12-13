import { connection } from "../database/db.js";
import bcrypt from 'bcrypt'

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
  
  bcrypt.hash(password, 10, (err, hash)=>{
    if(err){ 
      res.status(400).json({Error: err}) 
      return
    } 
    const sql = `INSERT INTO users(user_firstName, user_lastName, user_nickName, user_email, user_password) VALUES("${firstName}", "${lastName}", "${nickName}", "${email}", "${hash}")`
    connection.query(sql, (err, data)=>{
      if(err){ 
        res.status(400).json({Error: err.sqlMessage})
        return
      }
      res.status(200).json({message: "User register sucessful!", data})   
    })
  })
}