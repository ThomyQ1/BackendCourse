const crypto = require("crypto")

class ProductManager {
  static #Products = [];
  constructor() {}
  create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, Photo, Price, Stock are required");
      } else {
        const One = {
          id:crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#Products.push(One);
        return One;
      }
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      const AllProducts = ProductManager.#Products;
      if (AllProducts.length === 0) {
        throw new Error("There'nt any product");
      } else {
        return AllProducts;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const oneProduct = ProductManager.#Products.find(
        (each) => each.id === id
      );
      if (oneProduct) {
        return oneProduct;
      } else {
        throw new Error("There'nt any products");
      }
    } catch (error) {
      return error.message;
    }
  }

  destroy(id) {
    try {
      const one = ProductManager.#Products.find((each) => each.id === id);
      if (one) {
        ProductManager.#Products = ProductManager.#Products.filter(
          (each) => each.id !== id
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
}

const products = new ProductManager();
console.log(products.read());
const prodcut1 = products.create({
  title: "Goma",
  photo: "goma.jpg",
  price: 50,
  stock: 150,
});
const prodcut2 = products.create({
  title: "Boligrafo",
  photo: "Boligrafo Parker.jpg",
  price: 500,
  stock: 5,
});

const prodcut3 = products.create({ title: "Tijera", Price: 150 });
console.log(prodcut1, prodcut2, prodcut3);
console.log(products.read());
console.log(products.readOne(1));
console.log(products.readOne(10));
console.log(products.destroy(1));
console.log(products.destroy(10));
