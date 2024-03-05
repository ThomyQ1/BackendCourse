import { Router } from "express";

import { orders, users } from "../../data/mongo/manager.mongo.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";

const ordersRouter = Router();

ordersRouter.get("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    const user = await users.readByEmail(req.user.email);
    const filter = {
      user_id: user._id,
    };
    const all = await orders.read({ filter, options });
    console.log(all.docs[0].event_id);
    return res.render("orders", { title: "Mi carrito", orders: all.docs });
  } catch (error) {
    return res.render("orders", {
      title: "Mi carrito",
      message: "No hay ordenes",
    });
  }
});

export default ordersRouter;
