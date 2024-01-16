import { Router } from "express";
import productsManager from "../../data/fs/product.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await productsManager.read();
    return res.render("products", { products: all });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
