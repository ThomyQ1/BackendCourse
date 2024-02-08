import User from "../mongo/models/user.model.js";
import Product from "../mongo/models/product.model.js";
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(filter, order) {
    try {
      const all = await this.model
        .find(filter)
        .populate("user_id", "-password -createdAt -updatedAt -__v")
        .populate("product_id", "title price")
        .sort(order);
      if (all.lenght === 0) {
        const error = new Error("There'nt any documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      if (!one) {
        notFoundOne(one);
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
