import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { createUser, getUser, getUsers } from '../controller/adminController.js';


const router = express.Router();

router.use(verifyToken);

router.get('/users',verifyToken,getUsers)
router.get('/users/:id',verifyToken,getUser)
router.post('/users/createuser',createUser)

export default router;