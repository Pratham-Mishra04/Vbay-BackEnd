import mongoose, { Schema, Document } from 'mongoose';
import calculateCost from '../utils/costCalculator';

interface PurchaseHistory {
  isPurchased: boolean;
  purchasedAt: Date;
  purchasedBy: mongoose.Schema.Types.ObjectId;
}

export interface ProductDocument extends Document {
  title: string;
  images: string[];
  description: string;
  listedBy: mongoose.Schema.Types.ObjectId;
  mrp: number;
  estimatedPrice: number;
  age: number;
  leastAsked: number;
  tags: string[];
  category: string;
  listedAt: Date;
  purchaseHistory: PurchaseHistory;
}

const productSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  listedAt: {
    type: Date,
    default: Date.now,
  },
  mrp: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  leastAsked: {
    type: Number,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  purchaseHistory: {
    isPurchased: {
      type: Boolean,
      default: false,
    },
    purchasedAt: {
      type: Date,
      default: null,
    },
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
});

productSchema.virtual('bids', {
  ref: 'Bid',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre<ProductDocument>('save', function (next) {
  this.estimatedPrice = calculateCost(this);
  next();
});

productSchema.index({ leastAsked: 1 });

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
