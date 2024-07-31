import express from "express";
import Controller from"../Controller/auth.controller.js";
const router = express.Router();

router.post("/signup", Controller.SignUp);
router.post("/login", Controller.Login);
router.post("/logout", Controller.Logout);

 export default  router;