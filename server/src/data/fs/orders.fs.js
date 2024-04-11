import fs from "fs";
import crypto from "crypto";

class OrdersManager {
  static #orders = [];

  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      OrdersManager.#orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      OrdersManager.#orders.push(order);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2)
      );
      console.log("Created OID:" + order.oid);
      return order;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  read({ filter, options }) {
    try {
      let data = OrdersManager.#orders;
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
        throw new Error("Not Found");
      } else {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async readOne(oid) {
    const userOrders = OrdersManager.#orders.filter(
      (order) => order.oid === oid
    );
    if (userOrders.length > 0) {
      console.log(userOrders);
      return userOrders;
    } else {
      return Promise.resolve([]);
    }
  }

  async update(oid, quantity, state) {
    try {
      const order = OrdersManager.#orders.find((each) => each.oid === oid);
      if (order) {
        if (quantity !== undefined) {
          order.quantity = quantity;
        }
        if (state !== undefined) {
          order.state = state;
        }

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2)
        );

        console.log("Updated OID:" + oid);
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async destroy(oid) {
    try {
      const order = OrdersManager.#orders.find((each) => each.oid === oid);
      if (order) {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (each) => each.oid !== oid
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2)
        );

        console.log("Destroyed OID:" + oid);
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

const ordersManager = new OrdersManager("./src/data/fs/files/orders.json");
export default ordersManager;
