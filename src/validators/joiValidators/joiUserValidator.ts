import * as Joi from 'joi';
import { isValidNumber } from 'libphonenumber-js';
import * as fs from 'fs';
import User from '../../models/userModel';
import catchAsync from '../../managers/catchAsync';
import AppError from '../../managers/AppError';

const joiUserCreateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .required(),
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  username: Joi.string()
    .required(),
  regNo: Joi.string()
    .regex(/\d{2}\w{3}\d{4}/i)
    .required(),
  profilePic: Joi.string(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password'),
  phoneNo: Joi.string()
    .custom((value:string, helper:Joi.CustomHelpers) => {
      if (!isValidNumber(value))
      return helper.error('phoneNo.invalid');
      return value
    }).messages({
      'phoneNo.invalid':'Enter a valid Phone Number'
    })
    .required(),
  passwordChangedAt: Joi.forbidden(),
  admin: Joi.forbidden(),
  active: Joi.forbidden(),
  passwordResetToken: Joi.forbidden(),
  passwordResetTokenExpiresIn: Joi.forbidden(),
});

const joiUserUpdateSchema = Joi.object({
  name: Joi.forbidden(),
  email: Joi.forbidden(),
  username: Joi.string()
  .custom(async (value:string, helper:Joi.CustomHelpers) => {
    if (await User.findOne({ username: value }))
      return helper.error('username.duplicate', { message: 'User with this username already exists' });
  }),
  regNo: Joi.forbidden(),
  profilePic: Joi.string(),
  password: Joi.forbidden(),
  confirmPassword: Joi.forbidden(),
  phoneNo: Joi.string()
  .custom((value:string, helper:Joi.CustomHelpers) => {
    if (!isValidNumber(value))
    helper.error('phoneNo.invalid', { message: 'Enter a valid Phone Number' });
  }),
  passwordChangedAt: Joi.forbidden(),
  admin: Joi.forbidden(),
  active: Joi.forbidden(),
  passwordResetToken: Joi.forbidden(),
  passwordResetTokenExpiresIn: Joi.forbidden(),
});

export const joiUserCreateValidator = catchAsync(async (req, res, next) => {
  await joiUserCreateSchema.validateAsync(req.body).catch((error) => {
    if (req.file) {
      const picPath = `${req.file.destination}/${req.file.filename}`;
      fs.unlinkSync(picPath)
    }
    return next(error);
  });
  if (await User.findOne({ email: req.body.email })) next(new AppError('Email found already', 500))
  if (await User.findOne({ username: req.body.username })) next(new AppError('Username found already', 500))
  if (await User.findOne({ regNo: req.body.regNo })) next(new AppError('RegNo found already', 500))

  next();
});

export const joiUserUpdateValidator = catchAsync(async (req, res, next) => {
  await joiUserUpdateSchema.validateAsync(req.body).catch((error) => {
    if (req.file) {
      const picPath = `${req.file.destination}/${req.file.filename}`;
      fs.unlinkSync(picPath)
    }
    return next(error);
  });
  next();
});
