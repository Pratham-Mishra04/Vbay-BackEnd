import catchAsync from "../managers/catchAsync.js";
import Product from "../models/productModel.js";
import { updateDoc, getDoc } from "../utils/HandlerFactory.js";

export const getProduct= getDoc(Product);

export const addProduct=catchAsync(async (req, res, next)=>{
    const item=await Product.create(req.body);
    res.status(200).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:item
    })
})

export const updateProduct= updateDoc(Product);

export const deleteProduct= catchAsync(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    product.images.forEach(loc=>{
        fs.unlink(`./public/products/images/${loc}`,function(err){
            if(err) return next(err);
        }); 
    })
    await product.delete();
    res.status(204).json({
        status:"success",
        requestedAt: req.requestedAt,
        data:null
    })
})