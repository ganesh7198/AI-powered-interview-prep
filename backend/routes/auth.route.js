import express from 'express';
import { getUserProfile, loginController, logoutController, signupController } from '../controllers/authcontroller.js';
import protect from '../middleware/authmiddleware.js';
import upload from '../middleware/uploadmiddleware.js';
const router=express.Router()


router.post("/login",loginController)
router.post("/signup",upload.single("profileImage"),signupController)
router.get("/profile",protect,getUserProfile)
router.post("/logout",logoutController)


export default router;