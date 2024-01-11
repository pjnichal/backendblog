import { login, saveUser } from "../services/userservices.js";

export const registerUser = async (req, res) => {
  if (req.body.email && req.body.password) {
    await saveUser(req.body)
      .then((blogPost) => {
        return res.status(201).json({
          status: 201,
          message: "Post Inserted Successfully",
          data: blogPost,
        });
      })
      .catch((error) => {
        return res.status(403).json({
          status: 403,
          message: "ValError",
          error: error,
        });
      });
  } else {
    return res.status(403).json({
      status: 403,
      message: "ValError",
      error: { email: "Email", password: "password" },
    });
  }
};
export const loginandauth = async (req, res) => {
  if (req.body.email && req.body.password) {
    await login(req.body)
      .then((blogPost) => {
        return res.status(201).json({
          status: 201,
          message: "Post Inserted Successfully",
          data: blogPost,
        });
      })
      .catch((error) => {
        return res.status(403).json({
          status: 403,
          message: "ValError",
          error: error,
        });
      });
  } else {
    return res.status(403).json({
      status: 403,
      message: "ValError",
      error: { email: "Email", password: "password" },
    });
  }
};
