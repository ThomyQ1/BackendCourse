import CustomRouter from "../CustomRouter.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controllers.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREMIUM"], propsProducts, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN", "PREMIUM"], update);
    this.destroy("/:pid", ["ADMIN", "PREMIUM"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
