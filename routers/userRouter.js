import express from "express";
import { login, signup } from "../Controllers/authController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import { getUser  } from "../Controllers/userController.js";
import { joiUserCreateValidator } from "../validators/joiValidators/joiUserValidator.js";
import imageUploadParserer from "../utils/parserers/imageUploadParserer.js";
import resizePic from "../utils/resizePic.js";

const userRouter= express.Router()

userRouter.post('/login', login)

userRouter.post('/signup', signup)

userRouter.get('/:userID', protect, getUser)

export default userRouter