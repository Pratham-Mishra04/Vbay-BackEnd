import mongoose from "mongoose";

const itemSchema= new mongoose.Schema({
    title:String,
    description:String,
    listedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    listedAt:Date,
    leastAsked:Number,
    isPurchased:Boolean,
    purchasedAt:Date,
    bids:[{
        placedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        bid:Number,
        placedAt:{
            type:Date,
            default:Date.now()
        }
    }]
})

const Item = mongoose.model("Item", itemSchema);

export default Item;