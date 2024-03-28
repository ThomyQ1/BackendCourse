import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import ordersRouter from "./orders.router.js";

const product = new productsRouter();
const order = new ordersRouter();
const session = new sessionsRouter();

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", product.getRouter());
    this.router.use("/orders", order.getRouter());
    this.router.use("/sessions", session.getRouter());
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({ filter, options });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
