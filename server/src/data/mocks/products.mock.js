import "dotenv/config.js";
import dbConnection from "../../utils/db.js";
import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.repositories.js";

export default function ProductsMock() {
  return {
    title: faker.commerce.product(),
    photo: faker.image.urlLoremFlickr({ category: "fashion" }),
    price: faker.commerce.price({
      min: 100,
      max: 200,
      dec: 0,
    }),
    stock: faker.commerce.price({ min: 50, max: 200, dec: 0 }),
  };
}

async function CreateMocks() {
  try {
    const data = ProductsMock();
    dbConnection();
    await repository.create(data);
    console.log("Product created");
  } catch (error) {
    console.log(error);
  }
}
for (let i = 1; i <= 100; i++) {
  CreateMocks();
}

//acordarme de arreglar el indexfactory, tira undefined el metodo create.
