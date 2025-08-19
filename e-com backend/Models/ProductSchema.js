import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true }, // matches formData.productName
  price: { type: Number, required: true }, // formData.price
  originalPrice: { type: Number }, // optional
  category: { type: String, required: true }, // formData.category
  subCategory: { type: String, required: true }, // formData.subCategory
  stock: { type: Number, required: true }, // formData.stock
  description: { type: String, required: true }, // formData.description
  specification: { type: String, required: true }, // formData.specification
  images: [
    { type: String, required: true }, // imgSrc paths/URLs after upload
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
