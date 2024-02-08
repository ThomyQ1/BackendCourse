import { Router } from "express";
import { orders } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await orders.create(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    const all = await orders.read({ filter });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOne(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
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

export default ordersRouter;
