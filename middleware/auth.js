import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "RESTFULAPIs", (err, user) => {
      if (err) {
        return res.status(403).send({
          status: 403,
          code: "ATE",
          message: "access token invalid",
        });
      }
      req.user = user;

      return next();
    });
  } else {
    return res.status(403).send({
      status: 403,
      code: "ATM",
      message: "access token missing",
    });
  }
};
