import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import winston from "../../middlewares/winston.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/loggers", async (req, res, next) => {
      try {
        req.logger.error("Este es un mensaje de error de prueba");
        req.logger.fatal("Este es un mensaje de advertencia de prueba");
        req.logger.info("Este es un mensaje de información de prueba");
        req.logger.http("Este es un mensaje HTTP de prueba"); // Debe ser req.logger.http, no req.logger.HTTP
        return res.status(200).send("Logs probados exitosamente");
      } catch (error) {
        return next(error);
      }
    });

    this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
        console.log("global process id: " + process.pid);
        const child = fork("./src/utils/sum.util.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
      } catch (error) {
        return next(error);
      }
    });
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
