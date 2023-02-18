import * as sharp from 'sharp';
import * as fs from 'fs';
import slugify from 'slugify';
import logger from '../../../logs/logger';
import { NextFunction, Request, Response } from 'express';

export const resizePic = async (picPath:string, toPath:string, d1:number, d2:number): Promise<void> => {
  try {
    const buffer = await fs.promises.readFile(picPath);

    await sharp(buffer)
      .resize(d1, d2)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(toPath);

    await fs.promises.unlink(picPath);

  } catch (err) {
    logger.error(`Error in Resizing ${picPath}: ${err.message}`)
  }
};

export const resizeProfilePic = (req:Request, res:Response, next:NextFunction) => {
  if (!req.file) return next();

  const picPath = `${req.file.destination}/${req.file.filename}`;
  const toPath = `public/users/profilePics/${slugify(
    req.body.username
  )}-${Date.now()}.jpeg`;

  resizePic(picPath, toPath, 500, 500);

  req.body.profilePic = toPath.split('/')[3];

  next();
};

export const resizeProductPics = async (req:Request, res:Response, next:NextFunction) => {
  if (!req.body.images) return next();

  const resizedImgs = [];

  for (const [i, loc] of req.body.images.entries()) {    //because forEach wasnt working for await resizePic
    const picPath = `public/products/images/${loc}`;
    const toPath = `public/products/images/${slugify(req.user.username)}-${slugify(req.body.title)}-${i}-${Date.now()}.jpeg`;

    await resizePic(picPath, toPath, 1280, 720);

    resizedImgs.push(toPath);
  }

  req.body.images = resizedImgs;
  next();
};

