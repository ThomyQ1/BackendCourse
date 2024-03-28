import args from "../utils/args.js";
import crypto from "crypto";

class UsersDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (this.name = data.name),
      (this.photo =
        data.photo ||
        "https://images.squarespace-cdn.com/content/v1/563b99a2e4b024cc2d8d0510/1583184925522-ZYOD055BTNZ37EKSPF2V/Rudd%2BAdams%2BMasonry%2BTed%2BSmall.jpg"),
      (this.email = data.email),
      args.env !== "prod" && (this.updatedAt = new Date());
    args.env !== "prod" && (this.createdAt = new Date());
  }
}

export default UsersDTO;
