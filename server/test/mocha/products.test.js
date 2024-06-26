import assert from "assert";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";
const { products: productsMongo } = dao;

describe("Testing the products module", () => {
  const data = {
    title: "Buzo Hills Zip Wood",
    photo:
      "https://acdn.mitiendanube.com/stores/001/168/383/products/21148616-j-5-8720bbdf7d7032e17e17129467142275-640-0.jpg",
  };
  let id; // Variable para almacenar el ID del producto creado

  it('The creation of a product requires an object with the property "title"', async () => {
    const createdProduct = await productsMongo.create(data);
    assert.ok(createdProduct.title);
    id = createdProduct._id; // Almacenamos el ID del producto creado
  });

  it("The creation of a new product doesn't need an object with the property 'image'", () => {
    assert.strictEqual(data.image, undefined);
  });

  it("The function to create a product returns an object with the property '_id'", async () => {
    const createdProduct = await productsMongo.create(data);
    assert.ok(createdProduct._id);
    id = createdProduct._id; // Actualizamos el ID del producto creado
  });

  it("The function to create a product, returns an object", async () => {
    const one = await productsMongo.create(data);
    assert.strictEqual(typeof one, "object");
  });

  it("The function to read products must return an array with at least one product", async () => {
    const filter = { title: "Buzo Hills Zip Wood" };
    const options = {
      limit: 10,
      sort: { createdAt: -1 },
      select: "title price",
      lean: true,
    };
    const all = await productsMongo.read({ filter, options });
    assert(Array.isArray(all), "Expected 'all' to be an array");
    assert(all.length > 0, "Expected 'all' to contain at least one product");
  });
  it("The function to delete a product must delete a product", async () => {
    // Debugging: Log the ID before deletion
    console.log("Deleting product with ID:", id);

    // Ensure product exists before deletion
    const beforeDelete = await productsMongo.readOne(id);
    assert.ok(
      beforeDelete,
      `Expected product with ID ${id} to exist before deletion`
    );

    // Delete the product
    const deletedProduct = await productsMongo.destroy(id);
    assert.strictEqual(
      deletedProduct._id.toString(),
      id.toString(),
      `Expected product with ID ${id} to be deleted`
    );

    // Ensure product is deleted
    const afterDelete = await productsMongo.readOne(id);
    assert.strictEqual(
      afterDelete,
      null,
      `Expected product with ID ${id} to be deleted from database`
    );
  });
});
