import fs from "fs";
import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.js";

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
      ProductManager.#products.push(data);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );
      return data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read({ filter, options }) {
    try {
      let data = ProductManager.#products;
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

  readOne(id) {
    const one = ProductManager.#products.find((each) => each._id === id);
    if (one) {
      return one;
    } else {
      return "Not Found";
    }
  }

  async update(pid, data) {
    try {
      const one = this.readOne(pid);
      notFoundOne(one);
      products;
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.products = this.products.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductManager("./src/data/fs/files/products.json");
export default productsManager;
