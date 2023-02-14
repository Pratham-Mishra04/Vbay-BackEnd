import mongoose from 'mongoose';

interface purchaseHistory{
  isPurchased:boolean;
  purchasedAt: Date;
  purchasedBy: mongoose.Schema.Types.ObjectId
}

export interface ProductDocument {
  title:string;
  images:[string];
  description:string;
  listedBy:mongoose.Schema.Types.ObjectId;
  leastAsked: number;
  tags: [string];
  category: string;
  listedAt:Date;
  purchaseHistory:purchaseHistory
}

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

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
