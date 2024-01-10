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
      const order = {
        oid: crypto.randomBytes(12).toString("hex"),
        uid: data.uid,
        pid: data.pid,
        quantity: data.quantity,
        state: data.state || "pending",
      };
      OrdersManager.#orders.push(order);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2)
      );
      console.log("Created OID:" + order.oid);
      return order;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (OrdersManager.#orders.length === 0) {
        throw new Error("There aren't any orders");
      } else {
        console.log(OrdersManager.#orders);
        return OrdersManager.#orders;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(uid) {
    const userOrders = OrdersManager.#orders.filter(
      (order) => order.uid === uid
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
      console.log(error.message);
      return error.message;
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
      console.log(error.message);
      return error.message;
    }
  }
}

const ordersManager = new OrdersManager("./src/data/fs/files/orders.json");
export default ordersManager;
