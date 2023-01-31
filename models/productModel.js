import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listedAt: {
    type: Date,
    default: Date.now(),
  },
  leastAsked: Number,
  tags: [String],
  category: String,
  // quantity:Number,
  purchaseHistory: {
    isPurchased: {
      type: Boolean,
      default: false,
    },
    purchasedAt: Date,
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
});

productSchema.virtual('bids', {
  ref: 'Bid',
  foreignField: 'product',
  localField: '_id',
});

productSchema.index({ leastAsked: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
