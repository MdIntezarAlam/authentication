import express from 'express'
import { loginUser, userRegister, validUsers } from '../controller/userController.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = new express.Router()

router
    .route("/signup")
    .post(userRegister)
router
    .route("/login")
    .post(loginUser)
router
    .route("/validUser")
    .get(Authenticate,validUsers)

export default router