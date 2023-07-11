import express from 'express';
import isAuthenticated from "../middlewares/authenticated.js"
import { getMyTask, newTask, taskDelete, taskUpdate } from '../controllers/task.js';


const router = express.Router();


router.post("/new",isAuthenticated,newTask);
router.get('/all/me',isAuthenticated,getMyTask);
router.route("/:id").put(isAuthenticated,taskUpdate).delete(isAuthenticated,taskDelete);



export default router;