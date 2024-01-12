import { login, saveUser, getaccessToken } from "../services/userservices.js";

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
  await login(req.body)
    .then((token) => {
      return res.status(201).json(token);
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};
export const accessToken = async (req, res) => {
  // console.log(req.body);
  await getaccessToken(req.body.refreshToken)
    .then((token) => {
      return res.status(201).json(token);
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};
