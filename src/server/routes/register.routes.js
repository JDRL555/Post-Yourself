import { Router } from "express";
import { createUser } from "../controllers/register.controller.js";

const registerRouter = Router()

registerRouter.post("/register", createUser)

export default registerRouter