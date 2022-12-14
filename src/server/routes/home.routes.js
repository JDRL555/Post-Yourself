import { Router } from "express";
import { getPosts, createPost } from "../controllers/home.controller.js";


const homeRouter = Router()

homeRouter.get("/", getPosts)
homeRouter.post("/new/post", createPost)

export default homeRouter