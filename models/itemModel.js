import mongoose from "mongoose";

const itemSchema= new mongoose.Schema({
    title:String,
    description:String,
    listedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    listedAt:Date,
    cost:Number,
    isPurchased:Boolean,
    purchasedAt:Date
})

const Item = mongoose.model("Item", itemSchema);

export default Item;