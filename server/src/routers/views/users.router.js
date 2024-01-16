import { Router } from "express";
import usersManager from "../../data/fs/user.fs.js";

const usersRouter = Router();

usersRouter.use("/profile", (req, res, next) => {
  try {
    const one = usersManager.readOne("020c5bbea5ce2d4eb90a7a07");
    return res.render("profile", { user: one });
  } catch (error) {
    next(error);
  }
});

export default usersRouter