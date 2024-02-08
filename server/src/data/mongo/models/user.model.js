import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://images.squarespace-cdn.com/content/v1/563b99a2e4b024cc2d8d0510/1583184925522-ZYOD055BTNZ37EKSPF2V/Rudd%2BAdams%2BMasonry%2BTed%2BSmall.jpg",
    },
    role: { type: Number, default: 0 },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
