import ProductDto from "../dto/products.dto.js";
import dao from "../data/index.factory.js";
const { products } = dao;

class ProductsRep {
  constructor() {
    this.model = products;
    console.log("ProductsRep constructor - this.model:", this.model);
  }

  create = async (data) => {
    console.log("create - data:", data);
    data = new ProductDto(data);
    console.log("create - data (after ProductDto):", data);
    const response = await this.model.create(data);
    console.log("create - response:", response);
    return response;
  };

  read = async ({ filter, options }) => {
    console.log("read - filter:", filter);
    console.log("read - options:", options);
    return await this.model.read({ filter, options });
  };

  readOne = async (id) => {
    console.log("readOne - id:", id);
    return await this.model.readOne(id);
  };

  update = async (id, data) => {
    console.log("update - id:", id);
    console.log("update - data:", data);
    return await this.model.update(id, data);
  };

  destroy = async (id) => {
    console.log("destroy - id:", id);
    return await this.model.destroy(id);
  };
}

const repository = new ProductsRep();
export default repository;
