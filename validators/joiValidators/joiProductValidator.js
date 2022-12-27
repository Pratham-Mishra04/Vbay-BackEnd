import Joi from 'joi'
import catchAsync from '../../managers/catchAsync.js'
import path from 'path'
import fs from 'fs'

const __dirname=path.resolve();

const joiProductCreateSchema = Joi.object({
    title:Joi.string().required(),
    images:Joi.array().items(Joi.string()).required(),
    description:Joi.string(),
    listedBy:Joi.string().required(),
    listedAt:Joi.forbidden(),
    leastAsked:Joi.number().required(),
    tags:Joi.array().items(Joi.string()),
    category:Joi.string().required(),
    isPurchased:Joi.forbidden(),
    purchasedAt:Joi.forbidden()
})

const joiProductUpdateSchema = Joi.object({
    title:Joi.forbidden(),
    images:Joi.array().items(Joi.string()),
    description:Joi.string(),
    listedBy:Joi.forbidden(),
    listedAt:Joi.forbidden(),
    leastAsked:Joi.number(),
    tags:Joi.array().items(Joi.string()),
    category:Joi.string(),
    isPurchased:Joi.forbidden(),
    purchasedAt:Joi.forbidden()
})

export const joiProductCreateValidator = catchAsync((async (req, res, next)=>{
    req.body.listedBy=req.user.id;
    await joiProductCreateSchema.validateAsync(req.body).catch(error=>{
        if(req.body.images){
            req.body.images.forEach(loc=>{
                fs.unlink(`./public/products/images/${loc}`,function(err){
                    if(err) return next(err);
                });    
            })
        }
        return next(error)
    })
    next()
}))

export const joiProductUpdateValidator = catchAsync((async (req, res, next)=>{
    await joiProductUpdateSchema.validateAsync(req.body).catch(error=>{
        if(req.body.images){
            req.body.images.forEach(loc=>{        
                fs.unlinkSync(`public/products/images/${loc}`, function(err){
                    next(err)
                })
            })
        }
        return next(error)
    })
    next()
}))