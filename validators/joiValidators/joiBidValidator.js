import Joi from 'joi'

const joiBidSchema = Joi.object({
    placedBy:Joi.forbidden(),
    item:Joi.string().required(),
    bid:Joi.number().required()
})

const joiBidValidator = (async (req, res, next)=>{
    await joiBidSchema.validateAsync(req.body).catch(error=>{
        return next(error)
    })
    next()
})

export default joiBidValidator;