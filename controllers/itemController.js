import catchAsync from "../managers/catchAsync.js";
import Bid from "../models/bidModel.js";
import Item from "../models/itemModel.js";
import APIFeatures from "../utils/APIFeatures.js";
import { updateDoc, deleteDoc, getAllDocsByQuery, getDoc } from "../utils/HandlerFactory.js";

export const addItem=catchAsync(async (req, res, next)=>{
    req.body.listedBy=req.user.id;
    const item=await Item.create(req.body);
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:item
    })
})

export const getItem= getDoc(Item);

export const getAllItems=catchAsync(async (req, res, next)=>{
    const features = new APIFeatures(Item.find({listedBy:{$ne:req.user.id}}),req.query)

    features.filter().sort().fields().paginator();
    const docs = await features.query

    res.status(200).json({
        status: 'success',
        results: docs.length,
        requestedAt: req.requestedAt,
        data: docs,
    });
})

export const getUserItems=catchAsync(async (req, res, next)=>{
    const features = new APIFeatures(Item.find({listedBy:req.user.id}),req.query)

    features.filter().sort().fields().paginator();
    const docs = await features.query

    res.status(200).json({
        status: 'success',
        results: docs.length,
        requestedAt: req.requestedAt,
        data: docs,
    });
})

export const updateItem= updateDoc(Item);

export const deleteItem= deleteDoc(Item);

export const placeBid=catchAsync(async(req,res,next)=>{
    const bid = (await Bid.findOne({placedBy:req.user.id, item:req.params.id})!=null)? await Bid.findOneAndUpdate({placedBy:req.user.id, item:req.params.id},{bid:req.body.bid},{new:true}): await Bid.create({
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