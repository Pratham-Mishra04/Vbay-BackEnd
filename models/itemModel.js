import mongoose from "mongoose";

const itemSchema= new mongoose.Schema({
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
    quantity:Number,
    isPurchased:{
        type:Boolean,
        default:false
    },
    purchasedAt:Date
})

itemSchema.virtual('bids',{
    ref:'Bid',
    foreignField:'item',
    localField:'_id'
})

const Item = mongoose.model("Item", itemSchema);

export default Item;