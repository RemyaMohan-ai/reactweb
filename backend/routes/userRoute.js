import express from 'express'
const router = express.Router()

import {testapi} from '../controller/usercontroller.js'
import { verifyToken } from '../utils/verifyUser.js'
import { updateUser ,deleteUser } from '../controller/usercontroller.js'
router.get('/',testapi)
router.post('/update/:id',verifyToken ,updateUser )
router.delete('/delete/:id',verifyToken ,deleteUser )

export default router;