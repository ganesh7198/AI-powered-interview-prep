import express from 'express'
import protect from '../middleware/authmiddleware.js';
import { createSession, deleteSession, getMySession, getSessionById } from '../controllers/sessioncontroller.js';

const router =express.Router();

router.post("/create",protect,createSession)
router.get("/my-session",protect,getMySession)
router.get("/:id",protect,getSessionById)
router.delete("/:id",protect,deleteSession)

export default router;