import service from "../services/users.services.js";

class SessionsController {
  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.user;
    await this.service.register({ email, name, verifiedCode });
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
    } catch (error) {
      return next(error);
    }
  };
  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with google!");
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      if (req.user) {
        return res.json({
          statusCode: 200,
          response: "Session with email: " + req.user.email,
        });
      } else {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  };
  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else {
        return res.json({
          statusCode: 400,
          message: "Invalid verified token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401("Bad auth!");
    } catch (error) {
      return next(error);
    }
  };
  alreadysignedout = (req, res, next) => {
    try {
      return res.error400("Already Done!");
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const {
  register,
  login,
  google,
  read,
  signout,
  verifyAccount,
  badauth,
  alreadysignedout,
} = controller;
export {
  register,
  login,
  google,
  read,
  signout,
  verifyAccount,
  badauth,
  alreadysignedout,
};
