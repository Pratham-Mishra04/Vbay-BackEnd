import AppError from "../managers/AppError.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import { promisify } from "util";
import catchAsync from "../managers/catchAsync.js";

export const protect = catchAsync(async (req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))token=req.headers.authorization.split(' ')[1]
    if(!token) return next(new AppError("You are not Logged in. Please Login to continue", 401))

    const decoded= await promisify(jwt.verify)(token, envHandler("JWT_KEY"))
    const user= await User.findById(decoded.id)

    if(req.params.userID && decoded.id!=req.params.userID) return next(new AppError("Please Login in as the Modifying User.", 401))
    if(!user) return next(new AppError("User of this token no longer exists", 401))
    if(user.changedPasswordAfter(decoded.iat)) return next(new AppError("Password was recently changed. Please Login again", 401))

    req.user=user;
    next()
})

export const userItemProtect=catchAsync(async(req, res, next)=>{
    const item= await Item.findById(req.params.id);
    if(req.user.id!=item.listedBy) return next(AppError("You do not have the permission to perform this action", 403));
    next()
})

export const restrictTo = (...roles) =>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return next(new AppError("You do not have the permission to perform this action", 403));
        next()
    } 
}

export const adminOnly = (req, res, next)=>{
    if (!req.user.admin) return next(new AppError("You do not have the permission to perform this action", 403));
    next()
}