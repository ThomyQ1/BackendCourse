import CustomRouter from "../CustomRouter.js";
import {
  create,
  login,
  google,
  read,
  signout,
  badauth,
  alreadysignedout,
} from "../../controllers/sessions.controllers.js";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBackMid("register"),
      create
    );
    this.create("/login", ["PUBLIC"], passCallBackMid("login"), login);
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );
    this.read("/", ["PUBLIC"], passCallBackMid("jwt"), read);
    this.create("/signout", ["PUBLIC"], passCallBackMid("jwt"), signout);
    this.read("/badauth", badauth);
    this.read("/signout/cb", alreadysignedout);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
