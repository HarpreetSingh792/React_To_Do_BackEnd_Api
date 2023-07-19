import express from "express";
import {userDetails,userRegister,userLogin} from '../controllers/user.js';
import  isAuthenticated  from "../middlewares/authenticated.js";
const router = express.Router();

router.get("/logout",isAuthenticated,Logout)
router.get("/me", isAuthenticated ,userDetails)
router.post("/login", userLogin)
router.post("/register", userRegister)

export default router;
