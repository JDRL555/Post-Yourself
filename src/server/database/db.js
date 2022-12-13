import mysql from 'mysql'

export const connection = mysql.createConnection({
  host: "localhost",
  database: "post_yourself_db",
  user: "root",
  password: ""
})