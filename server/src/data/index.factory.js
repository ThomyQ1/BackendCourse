import ArgsUtil from "../utils/argsUtil.js";
console.log(ArgsUtil);

const environment = "dev";

let dao = {};

switch (key) {
  case "test":
    console.log("Memory Connected");
    const { default: productsMemory } = await import(
      "../data/memory/products.memory.js"
    );
    dao = { products: productsMemory };
    break;

  case "dev":
    console.log("Fs Connected");
    const { default: productsFs } = await import("../data/fs/product.fs.js");
    dao = { products: productsFs };
    break;

  case "prod":
    console.log("Mongo Connected");
    const { default: productsMongo } = await import(
      "../data/mongo/products.mongo.js"
    );
    dao = { products: productsMongo };
    break;

  default:
    break;
}

export default dao;
