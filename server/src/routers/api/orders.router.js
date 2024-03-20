import CustomRouter from "../CustomRouter.js";
import OrdersController, {
  create,
  read,
  report,
  update,
  destroy,
} from "../../controllers/orders.controllers.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREMIUM"], passCallBackMid("jwt"), create);
    this.read("/bills/:uid", ["USER", "PREMIUM", "ADMIN"], report);
    this.read("/", ["PUBLIC"], read);
    this.update("/:oid", ["ADMIN", "PREMIUM"], update);
    this.destroy("/:oid", ["ADMIN", "PREMIUM"], destroy);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
