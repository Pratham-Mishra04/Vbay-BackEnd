import catchAsync from '../managers/catchAsync';
import Bid from '../models/bidModel';
import Product, { ProductDocument } from '../models/productModel';
import APIFeatures from '../utils/APIFeatures';
import { Request, Response, NextFunction } from 'express';

export const getAllProducts = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const features = new APIFeatures<ProductDocument>(
    Product.find({ listedBy: { $ne: req.user.id } }),
    req.query
  );

  features.filter().sort().fields().paginator();
  const docs = await features.query;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    requestedAt: req.requestedAt,
    data: docs,
  });
});

export const getUserProducts = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const features = new APIFeatures<ProductDocument>(
    Product.find({ listedBy: req.user.id }),
    req.query
  );

  features.filter().sort().fields().paginator();
  const docs = await features.query;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    requestedAt: req.requestedAt,
    data: docs,
  });
});

export const getBoughtProducts = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const features = new APIFeatures<ProductDocument>(
    Product.find({
      productHistory: {
        isPurchased: true,
        purchasedBy: req.user.id,
      },
    }),
    req.query
  );

  features.filter().sort().fields().paginator();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    requestedAt: req.requestedAt,
    data: products,
  });
});

export const markPurchased = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const purchaseHistory = {
    isPurchased: true,
    purchasedAt: Date.now(),
    purchasedBy: req.body.purchasedByID,
  };
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      purchaseHistory,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: product,
  });
});

export const placeBid = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const bid =
    (await Bid.findOne({ placedBy: req.user.id, product: req.params.id })) != null
      ? await Bid.findOneAndUpdate(
          { placedBy: req.user.id, product: req.params.id },
          { bid: req.body.bid },
          { new: true }
        )
      : await Bid.create({
          placedBy: req.user.id,
          product: req.params.id,
          bid: req.body.bid,
        });

    const bids = await Bid.find({product:req.params.id}).populate('placedBy', 'username')

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    bids
  });
});

export const deleteBid = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  await Bid.findOneAndDelete({ placedBy: req.user.id, product: req.params.id });
  const bids = await Bid.find({product:req.params.id}).populate('placedBy', 'username')
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    bids:bids?bids:[]
  });
});
