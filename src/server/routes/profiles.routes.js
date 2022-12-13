import { Router } from "express";
import { createUser, getUsers, getUser } from "../controllers/register.controller.js";

const profilesRouter = Router()

profilesRouter.get("/profiles", getUsers)
profilesRouter.get("/profile/:id", getUser)
profilesRouter.post("/profile", createUser)


export default profilesRouter