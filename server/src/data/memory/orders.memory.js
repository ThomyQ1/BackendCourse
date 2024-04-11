import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.js";

class OrderManager {
  #Orders = [];

  create(data) {
    try {
      if (!data.uid || !data.pid || !data.quantity) {
        return { statusCode: 400, response: null };
      } else {
        const newOrder = {
          oid: crypto.randomBytes(12).toString("hex"),
          uid: data.uid,
          pid: data.pid,
          quantity: data.quantity,
          state: data.state || "pending",
        };
        this.#Orders.push(newOrder);
        return { statusCode: 201, response: newOrder };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }

  read({ filter, options }) {
    try {
      let data = this.#Orders;
      if (filter) {
        data = data.filter((item) => {
          return item.name === filter.name;
        });
      }
      if (options) {
        if (options.page && options.limit) {
          const startIndex = (options.page - 1) * options.limit;
          const endIndex = options.page * options.limit;
          data = data.slice(startIndex, endIndex);
        }
      }
      if (data.length === 0) {
        return { statusCode: 404, response: null };
      } else {
        return { statusCode: 200, response: data };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }
  readOne(oid) {
    try {
      const order = this.#Orders.find((each) => each.oid === oid);
      if (order) {
        return { statusCode: 200, response: order };
      } else {
        return { statusCode: 404, response: null };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }

  async update(oid, data) {
    try {
      const orderToUpdate = this.readOne(oid);
      notFoundOne(orderToUpdate);
      for (let key in data) {
        orderToUpdate[key] = data[key];
      }
      return orderToUpdate;
    } catch (error) {
      throw error;
    }
  }

  async destroy(oid) {
    try {
      const orderToDelete = this.readOne(oid);
      notFoundOne(orderToDelete);
      this.#Orders = this.#Orders.filter((each) => each.oid !== oid);
      return orderToDelete;
    } catch (error) {
      throw error;
    }
  }
}

const orders = new OrderManager();
export default orders;
