import express from 'express'
const router = express.Router()

import {testapi} from '../controller/usercontroller.js'

router.get('/',testapi)

export default router;