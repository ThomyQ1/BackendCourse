import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";
import passport from "passport";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.read(
      "/real",
      ["PUBLIC"],
      passport.authenticate("jwt", { session: false }),
      (req, res, next) => {
        try {
          return res.render("real", { title: "REAL" });
        } catch (error) {
          next(error);
        }
      }
    );

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
        return res.render("products", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "PRODUCTS",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
      }
    });

    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("detail", { product: one });
      } catch (error) {
        next(error);
      }
    });
  }
}
