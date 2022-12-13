import { connection } from '../database/db.js'

export const getPosts = (req, res) => {
  
  const sql = `SELECT * FROM users`
  connection.query(sql, (err, data)=>{
    if(!data.length){
      res.status(201).json({Message: "No users yet"})
      return
    }
    
    if(err){
      res.status(400).json({Error: err.sqlMessage})
    }
    res.status(200).json(data)
  })
}