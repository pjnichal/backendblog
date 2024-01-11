import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "RESTFULAPIs", (err, user) => {
      if (err) {
        return res.send({
          status: 403,
          code: "ATE",
          message: "access token invalid",
        });
      }

      return next();
    });
  } else {
    return res.send({
      status: 403,
      code: "ATM",
      message: "access token missing",
    });
  }
};
