import "dotenv/config.js";
import dbConnection from "../../utils/db.js";
import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.repositories.js";

console.log(process.env.DB_LINK);
dbConnection();

function productsMock() {
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

async function createMocks() {
  try {
    const data = productsMock();
    await repository.create(data);
  } catch (error) {
    console.log(error);
  }
}
for (let i = 1; i <= 100; i++) {
  createMocks();
}
