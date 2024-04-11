import args from "../utils/args.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (uid = data.uid),
      (pid = data.pid),
      (quantity = data.quantity),
      (state = data.state || "pending"),
      args.env !== "prod" && (this.updatedAt = new Date());
    args.env !== "prod" && (this.createdAt = new Date());
  }
}

export default OrderDTO;
