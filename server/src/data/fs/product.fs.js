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

  read({ filter, options }) {
    //aplicar paginacion y filtro
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There aren't any document");
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
      return "There aren't any document";
    }
  }

  //aca va el readbyemail

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

  async update(pid, data) {
    try {
      const one = this.readOne(pid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.events, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductManager("./src/data/fs/files/products.json");
export default productsManager;
