import { Router } from "express";
import { isAuthorized } from "../controllers/authorized.controller.js";
import { getPosts, createPost } from "../controllers/home.controller.js";


const homeRouter = Router()

homeRouter.get("/", isAuthorized, getPosts)
homeRouter.post("/new/post", createPost)
homeRouter.get("/profile", )

export default homeRouter