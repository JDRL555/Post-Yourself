import jwt from 'jsonwebtoken'

export const isAuthorized = (req, res, next)=>{
  const token = req.headers.token

  try {
    const response = jwt.verify(token, process.env.SECRET_KEY)
    res.status(200).send(response)
  } catch (error) {

    if(error == "JsonWebTokenError: jwt must be provided"){
      res.send(401).send("You need an acount to visite the site!")
    }

    if(error == "JsonWebTokenError: jwt malformed"){
      res.status(401).send("Invalid user. Please login with some valid acount!")
    }
  }
}
