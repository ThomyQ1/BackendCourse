import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.router.js";
import ViewsRouter from "./views/index.router.js";

const views = new ViewsRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", views.getRouter());
  }
}
