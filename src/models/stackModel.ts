import mongoose, { Schema, Document } from 'mongoose';
import Product, { ProductDocument } from './productModel';
import { UserDocument } from './userModel';

export interface StackDocument extends Document {
  user: UserDocument['_id'];
  products: ProductDocument['_id'][];
  isPurchased: boolean;
  price: number;
}

const stackSchema: Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        }
    ],
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

stackSchema.virtual('price').get(function (this: StackDocument) {
  if (this.products.length > 0) {
    return this.products.reduce(
      async (totalPrice, stackProductID) =>{
        const stackProduct= await Product.findById(stackProductID);
        return totalPrice + stackProduct.estimatedPrice
      },
      0
    );
  }
  return 0;
});

stackSchema.index({ price: 1 });

const Stack = mongoose.model<StackDocument>('Stack', stackSchema);

export default Stack;
