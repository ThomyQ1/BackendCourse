import crypto from "crypto";

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

  read() {
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

  destroy(id) {
    try {
      const index = this.#Products.findIndex((each) => each.id === id);
      if (index !== -1) {
        const deletedProduct = this.#Products.splice(index, 1);
        return { statusCode: 200, response: deletedProduct[0] };
      } else {
        return { statusCode: 404, response: null };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }

  update(id, data) {
    try {
      const index = this.#Products.findIndex((each) => each.id === id);

      if (index !== -1) {
        this.#Products[index] = {
          id,
          title: data.title !== undefined ? data.title : this.#Products[index].title,
          photo: data.photo !== undefined ? data.photo : this.#Products[index].photo,
          price: data.price !== undefined ? data.price : this.#Products[index].price,
          stock: data.stock !== undefined ? data.stock : this.#Products[index].stock,
        };

        return { statusCode: 200, response: this.#Products[index] };
      } else {
        return { statusCode: 404, response: null };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }
}

const products = new ProductManager();
export default products;
