import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.js";

class ProductManager {
  #Products = [];

  create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        return { statusCode: 400, response: null };
      } else {
        const One = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        this.#Products.push(One);
        return { statusCode: 201, response: One };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }

  read({ filter, options }) {
    // falta hacer el filtro y el paginate
    try {
      if (this.#Products.length === 0) {
        return { statusCode: 404, response: null };
      } else {
        return { statusCode: 200, response: this.#Products };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }

  readOne(id) {
    try {
      const oneProduct = this.#Products.find((each) => each.id === id);
      if (oneProduct) {
        return { statusCode: 200, response: oneProduct };
      } else {
        return { statusCode: 404, response: null };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }

  // falta el readbyemail

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.#Products = this.#Products.filter((each) => each.id !== id);
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
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager();
export default products;
