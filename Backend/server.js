import express from "express";
import dotenv from "dotenv";
import router from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";

import ConnectToMongo from "./Database/ConnectToMongoDB.js";

import MessageRoute from "./Routes/message.routes.js";
import userRoute from "./Routes/user.routes.js";
import {app, server} from "./socket/socket.js"
dotenv.config();

app.use(express.json());//To parse the incoming requests with JSON payloads(From req.body   )
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth", router)
app.use("/api/message", MessageRoute)
app.use("/api/users", userRoute)
server.listen(PORT || 8000,()=>{
        ConnectToMongo();
        console.log(`Successfully started the server on port ${PORT}`)
})