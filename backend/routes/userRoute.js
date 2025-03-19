import express from 'express'
const router = express.Router()

import {testapi} from '../controller/usercontroller.js'
import { verifyToken } from '../utils/verifyUser.js'
import { updateUser } from '../controller/usercontroller.js'
router.get('/',testapi)
router.post('/update/:id',verifyToken ,updateUser )

export default router;