const fs = require("fs").promises;
const path = require("path");

class ProductManager {
  #Products;

  constructor() {
    this.dataFolderPath = path.join(__dirname, "data");
    this.productsFilePath = path.join(this.dataFolderPath, "products.json");

    fs.mkdir(this.dataFolderPath, { recursive: true }).catch((error) => {
      console.error("Error creating data folder:", error.message);
    });

    this.#Products = this.readFromFile().catch((error) => {
      console.error("Error reading products file:", error.message);
      return [];
    });
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, Photo, Price, Stock are required");
      } else {
        const newProduct = {
          id: (await this.#Products).length + 1,
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };

        const updatedProducts = [...(await this.#Products), newProduct];
        await this.writeToFile(updatedProducts);

        return newProduct;
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async read() {
    try {
      return await this.#Products;
    } catch (error) {
      return { error: error.message };
    }
  }

  async readOne(id) {
    try {
      const products = await this.#Products;
      const oneProduct = products.find((each) => each.id === Number(id));

      if (oneProduct) {
        return oneProduct;
      } else {
        throw new Error("There's no product with the given id");
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async readFromFile() {
    try {
      const data = await fs.readFile(this.productsFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      } else {
        throw error;
      }
    }
  }

  async writeToFile(products) {
    try {
      await fs.writeFile(
        this.productsFilePath,
        JSON.stringify(products, null, 2)
      );
      this.#Products = products;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager();

(async () => {
  console.log(await products.read());
  console.log(
    await products.create({
      title: "Goma",
      photo: "goma.jpg",
      price: 50,
      stock: 150,
    })
  );
  console.log(
    await products.create({
      title: "Boligrafo",
      photo: "Boligrafo Parker.jpg",
      price: 500,
      stock: 5,
    })
  );
  console.log(await products.create({ title: "Tijera", price: 150 }));
  console.log(await products.read());
  console.log(await products.readOne(1));
  console.log(await products.readOne(10));
})();
