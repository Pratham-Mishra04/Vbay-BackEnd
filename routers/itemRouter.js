import express from "express";
import { protect, userItemProtect } from "../Controllers/authController.js";
import { addItem, deleteBid, deleteItem, getAllItems, getItem, placeBid, updateItem } from "../controllers/itemController.js";

const itemRouter= express.Router()

itemRouter.route('/').get(protect, getAllItems).post(protect, addItem)
itemRouter.route('/:id').get(protect, getItem).patch(protect, userItemProtect, updateItem).delete(protect, userItemProtect, deleteItem)

itemRouter.route('/:id/bid/').post(protect, placeBid).delete(protect, deleteBid)

export default itemRouter