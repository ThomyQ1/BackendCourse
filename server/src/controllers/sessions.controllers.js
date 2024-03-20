class SessionsController {
  create = async (req, res, next) => {
    try {
      return res.success201("Registered!");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .success200("Logged In!");
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
      return res.clearCookie("token").success200("Signed Out!");
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
const { create, login, google, read, signout, badauth, alreadysignedout } =
  controller;
export { create, login, google, read, signout, badauth, alreadysignedout };
