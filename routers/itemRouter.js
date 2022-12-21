import express from "express";
import { protect, userItemProtect } from "../middlewares/authMiddlewares.js";
import { addItem, deleteBid, deleteItem, getAllItems, getItem, placeBid, updateItem } from "../controllers/itemController.js";
import { productImgUploadParserer } from "../utils/parserers/imageUploadParserer.js";
import { resizeProductPics } from "../utils/resizePic.js";

const itemRouter= express.Router()

itemRouter.route('/').get(protect, getAllItems).post(protect, productImgUploadParserer, resizeProductPics, addItem)
itemRouter.route('/:id').get(protect, getItem).patch(protect, userItemProtect, updateItem).delete(protect, userItemProtect, deleteItem)

itemRouter.route('/:id/bid/').post(protect, placeBid).delete(protect, deleteBid)

export default itemRouter