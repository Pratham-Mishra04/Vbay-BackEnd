import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../managers/AppError";
import catchAsync from "../managers/catchAsync";
import envHandler from "../managers/envHandler";

export const createSendToken = (user:User, statusCode:number, res:Response)=>{
    const token=jwt.sign({ id:user._id }, envHandler("JWT_KEY"), {expiresIn: Number(envHandler("JWT_TIME"))*24*60})
    user.password=undefined
    
    const cookieSettings={
        expires: new Date(
            Date.now() + Number(envHandler("JWT_TIME"))*24*60*60*1000
        ),
        httpOnly:true,
        secure:false
    };

    if(envHandler("NODE_ENV")==="prod") cookieSettings.secure=true;

    res.cookie('token', token, cookieSettings)
    res.status(statusCode).json({
        status:"success",
        token:token,
        data:{
            user:user
        }
    })
}

export const signup = catchAsync(async (req: Request,res: Response, next: NextFunction)=>{
        const newUser= await User.create(req.body)
        createSendToken(newUser, 201, res)
})

export const login = catchAsync(async (req: Request,res: Response, next: NextFunction)=>{
        const { email, password } = req.body;
        if(!email || !password) return next(new AppError("Email or Password doesn't exists", 400));
        const user= await User.findOne({email:email}).select("+password")
        if(!user || !await user.correctPassword(password, user.password)) throw new AppError("Incorrect Email or Password", 400);
        createSendToken(user, 200, res)
})

export const logout = catchAsync(async (req: Request,res: Response, next: NextFunction)=>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now()+ 1*1000),
        httpOnly: true
    });
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        message :"User Loggout Out"
    })
})