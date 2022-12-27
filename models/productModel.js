import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    title:String,
    images:[String],
    description:String,
    listedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    listedAt:{
        type:Date,
        default:Date.now()
    },
    leastAsked:Number,
    tags:[String],
    category:String,
    // quantity:Number,
    isPurchased:{
        type:Boolean,
        default:false
    },
    purchasedAt:Date
})

productSchema.virtual('bids',{
    ref:'Bid',
    foreignField:'product',
    localField:'_id'
})

const Product = mongoose.model("Product", productSchema);

export default Product;