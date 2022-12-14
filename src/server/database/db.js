import mysql from 'mysql2/promise'

export const connection = mysql.createPool({
  host: "localhost",
  database: "post_yourself_db",
  user: "root",
  password: ""
})