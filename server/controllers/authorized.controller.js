import jwt from 'jsonwebtoken'

export const isAuthorized = (req, res, next)=>{
  const token = req.headers.token
  console.log(token)

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
    if(err) {
      console.log(`El error es el siguiente: ${err.message}`)
      return res.status(401).send("You don't have access to this site. Please verify you have a count and come later!")
    }

    res.status(200).send(`Welcome, ${decoded}`)
    next()
  })
}
