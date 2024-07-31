import express from "express";
import { getUsersForSidebar } from "../Controller/user.controller.js";
import { protectRoute } from "../Middleware/protectRoute.js";

const userRoute = express.Router();

userRoute.get("/", protectRoute, getUsersForSidebar)

export default userRoute;