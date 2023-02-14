import mongoose from 'mongoose';

export interface BidDocument extends mongoose.Document{
  placedBy:mongoose.Schema.Types.ObjectId;
  product:mongoose.Schema.Types.ObjectId;
  bid:number;
  placedAt:Date;
}

const bidSchema = new mongoose.Schema(
  {
    placedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
    bid: Number,
  },
  {
    timestamps: {
      createdAt: 'placedAt',
    },
  }
);

bidSchema.index({ bid: -1 });

const Bid = mongoose.model<BidDocument>('Bid', bidSchema);

export default Bid;
