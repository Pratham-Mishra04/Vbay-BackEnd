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
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bid'
    }]
})

itemSchema.virtual('bids',{
    ref:'Bid',
    foreignField:'item',
    localField:'_id'
})

const Item = mongoose.model("Item", itemSchema);

export default Item;