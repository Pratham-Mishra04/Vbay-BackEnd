import * as express from 'express';
import { protect } from '../middlewares/authMiddlewares';
import {
  deleteBid,
  getAllProducts,
  getUserProducts,
  getBoughtProducts,
  placeBid,
  markPurchased,
} from '../controllers/shopController';
import Product, {ProductDocument} from '../models/productModel';
import APIFeatures from '../utils/APIFeatures';

const shopRouter = express.Router();

shopRouter.route('/').get(protect, getAllProducts);

shopRouter.route('/guest').get(async(req, res)=>{
  const features = new APIFeatures<ProductDocument>(
    Product.find(),
    req.query
  );

  features.filter().sort().fields().paginator().search();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    requestedAt: req.requestedAt,
    products,
  });
});

shopRouter.route('/orders').get(protect, getBoughtProducts);

shopRouter.route('/buy/:id').post(protect, markPurchased);

shopRouter.route('/listed').get(protect, getUserProducts);

shopRouter
  .route('/:id/bid/')
  .post(protect, placeBid)
  .delete(protect, deleteBid);

export default shopRouter;
