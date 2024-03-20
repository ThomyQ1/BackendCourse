import CustomRouter from "../CustomRouter.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/users.controllers.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], propsUsers, create);
    this.read("/", ["ADMIN"], read);
    this.read("/:uid", ["USER", "PREMIUM"], readOne);
    this.update("/:uid", ["USER", "PREMIUM"], update);
    this.destroy("/:uid", ["USER", "PREMIUM"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
