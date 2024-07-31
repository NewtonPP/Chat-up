import express from "express";
import { sendMessage, getMessage } from "../Controller/Message.controller.js";
import { protectRoute } from "../Middleware/protectRoute.js";

const MessageRoute = express.Router();

MessageRoute.post("/send/:id",protectRoute, sendMessage)
MessageRoute.get("/:id",protectRoute, getMessage)

export default MessageRoute;