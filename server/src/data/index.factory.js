import args from "../utils/args.js";
console.log(args);

const enviroment = args.env;

let dao = {};

switch (enviroment) {
  case "test":
    console.log("Fs Connected");
    const { default: productsFs } = await import("../data/fs/product.fs.js");
    const { default: usersFs } = await import("../data/fs/user.fs.js");
    const { default: ordersFs } = await import("../data/fs/orders.fs.js");
    dao = { products: productsFs, users: usersFs, orders: ordersFs };
    break;

  case "dev":
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

  default:
    break;
}

export default dao;
