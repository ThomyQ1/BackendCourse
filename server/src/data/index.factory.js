import args from "../utils/args.js";
console.log(args);

const enviroment = args.env;

let dao = {};

switch (enviroment) {
  case "test":
    console.log("Memory Connected");
    const { default: productsMemory } = await import(
      "../data/memory/products.memory.js"
    );
    const { default: usersMemory } = await import(
      "../data/memory/users.memory.js"
    );
    const { default: ordersMemory } = await import(
      "../data/memory/orders.memory.js"
    );
    dao = {
      products: productsMemory,
      users: usersMemory,
      orders: ordersMemory,
    };
    break;

  case "dev":
    console.log("Fs Connected");
    const { default: productsFs } = await import("../data/fs/product.fs.js");
    const { default: usersFs } = await import("../data/fs/user.fs.js");
    const { default: ordersFs } = await import("../data/fs/orders.fs.js");
    dao = { products: productsFs, users: usersFs, orders: ordersFs };
    break;

  default:
    console.log("Mongo Connected");
    const { default: productsMongo } = await import(
      "../data/mongo/products.mongo.js"
    );
    const { default: usersMongo } = await import(
      "../data/mongo/users.mongo.js"
    );
    const { default: ordersMongo } = await import(
      "../data/mongo/orders.mongo.js"
    );
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo };
    break;
}

export default dao;
