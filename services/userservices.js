import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const saveUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const user = User({ email, password: hashedPassword });
      await user.save();
      return resolve({
        status: 201,
        code: "AUTHR",
        message: "Registration successful",
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return reject({
          status: 401,
          code: "UAE",
          message: "user with email address already exists",
        });
    }
  });
};

// export const updateUser = (id, user) => {
//   return new Promise(async (resolve, reject) => {
//     const updatedItem = await User.findByIdAndUpdate(id, user, {
//       new: true,
//     });

//     if (updatedItem) {
//       return resolve(updatedItem);
//     } else {
//       return reject();
//     }
//   });
// };
export const login = (cred) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = cred;
    const user = await User.findOne({ email: email });

    if (user == null) {
      return reject({
        status: 404,
        code: "UNF",
        message: "User with this email does not exists",
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      let refreshToken = jwt.sign(
        { email: user.email, _id: user._id },
        "RESTFULAPIs",
        { expiresIn: "7d" }
      );
      let accessToken = jwt.sign(
        { email: user.email, _id: user._id },
        "RESTFULAPIs",
        {
          expiresIn: "1d",
        }
      );
      await User.updateOne(
        { email: user.email },
        { refreshToken: refreshToken }
      );
      return resolve({
        status: 200,
        code: "AUTHS",
        message: "Login successful",
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } else {
      return reject({
        status: 401,
        code: "AUTHF",
        message: "Invalid username or password",
      });
    }
  });
};
export const getaccessToken = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    jwt.verify(refreshToken, "RESTFULAPIs", async (err, user) => {
      if (err) {
        return reject({
          status: 403,
          code: "ATE",
          message: "refreshToken token invalid",
        });
      }
      let userInDb = await User.findOne({ email: user.email });
      if (userInDb.refreshToken === refreshToken) {
        let accessToken = jwt.sign(
          { email: user.email, _id: user._id },
          "RESTFULAPIs",
          {
            expiresIn: "1d",
          }
        );
        return resolve({
          status: 200,
          code: "ATR",
          message: "Acceess token granted",
          data: {
            accessToken: accessToken,
          },
        });
      }
    });
  });
};
