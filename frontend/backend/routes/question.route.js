import express from 'express'
import protect from '../middleware/authmiddleware.js';
import { addQuestionToSession, togglePinQuestion, updateQuestionNote } from '../controllers/questioncontroller.js';

const router=express.Router();


router.post("/add",protect,addQuestionToSession);
router.post("/:id/pin",protect,togglePinQuestion);
router.post("/:id/note",protect,updateQuestionNote);
export default router;