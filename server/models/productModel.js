import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  isCustomizable: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
