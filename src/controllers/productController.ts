import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import catchAsync from '../managers/catchAsync';
import Product from '../models/productModel';
import { updateDoc } from '../utils/HandlerFactory';
import AppError from '../managers/AppError';

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)
      .populate('listedBy', 'username')
      .populate({
        path: 'bids',
        populate: {
          path: 'placedBy',
          select: 'username',
        },
      });

    if (!product) return next(new AppError('No Product of this ID found', 401));
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestedAt,
      product,
    });
  }
);

export const addProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const item = await Product.create(req.body);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestedAt,
      data: item,
    });
  }
);

export const updateProduct = updateDoc(Product);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);
    product.images.forEach((loc: string) => {
      fs.unlink(`./public/products/images/${loc}`, (err) => {
        if (err) return next(err);
      });
    });
    await product.delete();
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestedAt,
      data: null,
    });
  }
);
