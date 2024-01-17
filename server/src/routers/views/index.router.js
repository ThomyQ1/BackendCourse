import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", {});
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/register", usersRouter)
export default viewsRouter;
