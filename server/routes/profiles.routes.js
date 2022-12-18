import { Router }                         from "express"
import { 
  createUser, 
  getUsers, 
  getUser, 
  loginUser 
}  from "../controllers/profiles.controller.js"

const profilesRouter = Router()

profilesRouter.get("/profiles", getUsers)
profilesRouter.get("/profile/:id", getUser)
profilesRouter.post("/profile/register", createUser)
profilesRouter.post("/profile/login", loginUser)


export default profilesRouter