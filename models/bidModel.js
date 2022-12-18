import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    placedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    },
    bid:Number,
    placedAt:{
        type:Date,
        default:Date.now()
    }
})

bidSchema.index({'bid':-1})

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;