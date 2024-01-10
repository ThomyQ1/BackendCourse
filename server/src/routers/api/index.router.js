import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)

export default apiRouter