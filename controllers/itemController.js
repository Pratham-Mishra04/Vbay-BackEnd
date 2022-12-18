import catchAsync from "../managers/catchAsync.js";
import Bid from "../models/bidModel.js";
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

export const getAllItems= getAllDocsByQuery(Item, {listedBy:{$ne:req.user.id}})

export const getUserItems= getAllDocsByQuery(Item, {listedBy:req.user.id});

export const updateItem= updateDoc(Item);

export const deleteItem= deleteDoc(Item);

export const placeBid=catchAsync(async(req,res,next)=>{
    const bid = await Bid.find({placedBy:req.user.id, item:req.params.id})? await Bid.findOneAndUpdate({placedBy:req.user.id, item:req.params.id},{bid:req.body.bid}): await Bid.create({
        placedBy:req.user.id,
        item:req.params.id,
        bid:req.body.bid,
    })
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:bid
    })
})

export const deleteBid= catchAsync(async (req, res, next)=>{
    await Bid.findOneAndDelete({placedBy:req.user.id, item:req.params.id});
    res.status(204).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:null
    })
})