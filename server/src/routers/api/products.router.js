import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdminMid from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js";

const productsRouter = Router();

productsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdminMid,
  propsProducts,
  async (req, res, next) => {
    try {
      const data = req.body;
      const response = await products.create(data);

      return res.status(201).json({
        statusCode: 201,
        message: "Created",
        response,
      });
    } catch (error) {
      return next(error);
    }
  }
);

productsRouter.get("/", async (req, res, next) => {
  try {
    const filter = { category: req.params.category };
    const order = { order: req.query.order };
    const all = await products.read({});
    return res.json({
      statusCode: 200,
      response: all || [],
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);

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
    const response = await products.update(quantity, pid);
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
    const response = await products.destroy(pid);
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
