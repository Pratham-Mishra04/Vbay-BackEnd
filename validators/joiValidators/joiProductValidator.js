import Joi from 'joi'

const joiProductCreateSchema = Joi.object({
    title:Joi.string().required(),
    images:Joi.array().items(Joi.string()).required(),
    description:Joi.string(),
    listedBy:Joi.string().required(),
    listedAt:Joi.forbidden(),
    leastAsked:Joi.number().required(),
    tags:Joi.array().items(Joi.string()).required(),
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

export const joiProductCreateValidator = (async (req, res, next)=>{
    await joiProductCreateSchema.validateAsync(req.body).catch(error=>{
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
})

export const joiProductUpdateValidator = (async (req, res, next)=>{
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
})