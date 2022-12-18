import catchAsync from "../managers/catchAsync.js";
import Item from "../models/itemModel";
import { updateDoc, deleteDoc, getAllDocsByQuery } from "../utils/HandlerFactory.js";

export const addItem=catchAsync(async (req, res, next)=>{
    req.body.listedBy=req.user.id;
    const item=await Item.create(req.body);
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:item
    })
})

export const placeBid=catchAsync(async(req,res,next)=>{
    const item=await Item.findById(req.params.id)
    const bid={
        placedBy:req.user.id,
        bid:req.body.bid,
    }
    item.bids.append(bid);
    item.save();
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:item
    })
})

export const getAllItems= getAllDocsByQuery(Item, {listedBy:{$ne:req.user.id}})

export const getUserItems= getAllDocsByQuery(Item, {listedBy:req.user.id});

export const updateItem= updateDoc(Item);

export const deleteItem= deleteDoc(Item);