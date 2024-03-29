import fs from "fs";
import crypto from "node:crypto";

class ProductManager {
  static #products = [];
  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }
  async create(data) {
    try {
      const one = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(one);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );
      console.log("Created ID:" + one.id);
      return one;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There'nt any product");
      } else {
        console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    const one = ProductManager.#products.find((each) => each.id === id);

    if (one) {
      console.log(one);
      return one;
    } else {
      return "Producto no encontrado";
    }
  }

  async destroy(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Destroyed ID:" + id);
      } else {
        throw new Error("There'nt any products");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async update(quantity, pid) {
    try {
      const one = this.readOne(pid);
      if (one) {
        if (one.capacity >= quantity) {
          one.capacity = one.capacity - quantity;
          const jsonData = JSON.stringify(this.events, null, 2);
          await fs.promises.writeFile(this.path, jsonData);
          console.log("Capacity available " + one.capacity);
          return one.capacity;
        } else {
          throw new Error("There aren't capacity");
        }
      } else {
        throw new Error("There isn't any event");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const productsManager = new ProductManager("./src/data/fs/files/products.json");
export default productsManager;
