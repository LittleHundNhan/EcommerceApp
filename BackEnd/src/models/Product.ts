import mongoose, { Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  categoryId: mongoose.Types.ObjectId;  // Liên kết với Category
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",  // Liên kết với model Category
        required: true,
      },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
