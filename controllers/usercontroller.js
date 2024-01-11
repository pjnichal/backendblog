import { login, saveUser } from "../services/userservices.js";

export const registerUser = async (req, res) => {
  await saveUser(req.body)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};
export const loginandauth = async (req, res) => {
  if (req.body.email && req.body.password) {
    await login(req.body)
      .then((token) => {
        return res.status(201).json(token);
      })
      .catch((error) => {
        return res.status(403).json(error);
      });
  } else {
    return res.status(403).json({
      status: 403,
      message: "ValError",
      error: { email: "Email", password: "password" },
    });
  }
};
