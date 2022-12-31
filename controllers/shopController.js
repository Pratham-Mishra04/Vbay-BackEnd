import catchAsync from "../managers/catchAsync.js";
import Bid from "../models/bidModel.js";
import Product from "../models/productModel.js";
import APIFeatures from "../utils/APIFeatures.js";

export const getAllProducts=catchAsync(async (req, res, next)=>{
    const features = new APIFeatures(Product.find({listedBy:{$ne:req.user.id}}),req.query)

    features.filter().sort().fields().paginator();
    const docs = await features.query

    res.status(200).json({
        status: 'success',
        results: docs.length,
        requestedAt: req.requestedAt,
        data: docs,
    });
})

export const getUserProducts=catchAsync(async (req, res, next)=>{
    const features = new APIFeatures(Product.find({listedBy:req.user.id}),req.query)

    features.filter().sort().fields().paginator();
    const docs = await features.query

    res.status(200).json({
        status: 'success',
        results: docs.length,
        requestedAt: req.requestedAt,
        data: docs,
    });
})

export const getBoughtProducts=catchAsync(async(req, res, next)=>{
    const features = new APIFeatures(Product.find({productHistory:{
        isPurchased:true,
        purchasedBy:req.user.id
    }}),req.query)

    features.filter().sort().fields().paginator();
    const products = await features.query

    res.status(200).json({
        status: 'success',
        results: products.length,
        requestedAt: req.requestedAt,
        data: products,
    });
})


export const markPurchased = catchAsync(async (req, res, next)=>{
    const purchaseHistory={
        isPurchased:true,
        purchasedAt:Date.now(),
        purchasedBy:req.body.purchasedByID
    };
    const product= await Product.findByIdAndUpdate(req.params.id,{
        purchaseHistory:purchaseHistory
    },{
        new:true
    })
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:product
    })
})

export const placeBid=catchAsync(async(req,res,next)=>{
    const bid = await Bid.findOne({placedBy:req.user.id, item:req.params.id})!=null?
                    await Bid.findOneAndUpdate({placedBy:req.user.id, item:req.params.id},{bid:req.body.bid},{new:true})
                        :await Bid.create({
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