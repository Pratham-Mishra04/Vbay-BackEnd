import express from 'express'
import { protect } from "../middlewares/authMiddlewares.js";
import { deleteBid, getAllProducts, getUserProducts, getBoughtProducts, placeBid ,markPurchased } from "../controllers/shopController.js";


const shopRouter = express.Router();

shopRouter.route('/')
                .get(protect, getAllProducts)

shopRouter.route('/orders')
                .get(protect, getBoughtProducts)
            
shopRouter.route('/buy/:id')
                .post(protect, markPurchased)
            
shopRouter.route('/listed')
                .get(protect, getUserProducts)

shopRouter.route('/:id/bid/')
            .post(protect, placeBid)
            .delete(protect, deleteBid)

export default shopRouter;
