import Joi from 'joi'
import catchAsync from '../../managers/catchAsync'

const joiBidSchema = Joi.object({
    placedBy:Joi.forbidden(),
    product:Joi.string().required(),
    bid:Joi.number().required()
})

const joiBidValidator = catchAsync((async (req, res, next)=>{
    await joiBidSchema.validateAsync(req.body).catch(error=>{
        return next(error)
    })
    next()
}))

export default joiBidValidator;