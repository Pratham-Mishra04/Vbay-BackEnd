import * as express from 'express';
import { protect, userProductProtect } from '../middlewares/authMiddlewares';
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../controllers/productController';
import { productImgUploadParserer } from '../utils/parserers/imageUploadParserer';
import { resizeProductPics } from '../utils/resizePic';
import categoryCheck from '../validators/categoryChecker';
import {
  joiProductCreateValidator,
  joiProductUpdateValidator,
} from '../validators/joiValidators/joiProductValidator';

const productRouter = express.Router();

productRouter
  .route('/')
  .post(
    protect,
    productImgUploadParserer,
    joiProductCreateValidator,
    resizeProductPics,
    categoryCheck,
    addProduct
  );

productRouter
  .route('/:id')
  .get(protect, getProduct)
  .patch(protect, userProductProtect, joiProductUpdateValidator, updateProduct)
  .delete(protect, userProductProtect, deleteProduct);

export default productRouter;
