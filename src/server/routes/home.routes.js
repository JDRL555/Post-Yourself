import { Router } from "express";
import { getPosts } from "../controllers/home.controller.js";

const homeRouter = Router()

homeRouter.get("/", getPosts)

export default homeRouter