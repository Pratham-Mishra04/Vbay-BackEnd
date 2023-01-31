import mongoose from 'mongoose';

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

const Category = mongoose.model('Category', categorySchema);

export default Category;
