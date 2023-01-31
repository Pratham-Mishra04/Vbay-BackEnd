import mongoose from 'mongoose';

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

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
