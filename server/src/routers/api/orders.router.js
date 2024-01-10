import { Router } from "express";
import ordersManager from "../../data/fs/orders.fs.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ordersManager.create(data);

    return res.status(201).json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await ordersManager.readOne(oid);

    if (one === "No orders found for the user") {
      return res.status(404).json({
        statusCode: 404,
        message: "Orden no encontrada",
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

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await ordersManager.destroy(oid);
    if (response === "There aren't any orders") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: "Destroyed ID:" + oid,
      });
    }
  } catch (error) {
    return next(error);
  }
});
