import { Router } from "express";
import productsManager from "../../data/fs/product.fs.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productsManager.create(data);

    return res.status(201).json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await productsManager.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);

    if (one === "Producto no encontrado") {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await productsManager.update(quantity, pid);
    if (response) {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productsManager.destroy(pid);
    if (response === "There'nt any products") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: "Destroyed ID:" + pid,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
