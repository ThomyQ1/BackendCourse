import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: { type: String, required: true },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;
