import mongoose from 'mongoose';

export interface CategoryDocument extends mongoose.Document{
  title:string;
  createdAt:Date;
}

const categorySchema = new mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: 'title',
});

const Category = mongoose.model<CategoryDocument>('Category', categorySchema);

export default Category;
