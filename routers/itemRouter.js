import express from "express";
import { protect, userItemProtect } from "../Controllers/authController";
import { addItem, deleteItem, updateItem } from "../controllers/itemController";

const itemRouter= express.Router()

itemRouter.post('/', protect, addItem)
itemRouter.route('/:id').patch(protect, userItemProtect, updateItem).delete(protect, userItemProtect, deleteItem)

export default itemRouter