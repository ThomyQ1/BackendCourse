import args from "../utils/args.js";
import crypto from "crypto";

class ProductDto {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (this.title = data.title),
      (this.photo = data.photo),
      (this.price = data.price || 10000),
      (this.stock = data.stock || 50);
    args.env !== "prod" && (this.updatedAt = new Date());
    args.env !== "prod" && (this.createdAt = new Date());
  }
}

export default ProductDto;
