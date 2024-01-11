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
      return resolve(user);
    } catch (error) {
      let validationError = {};
      for (const valerr in error.errors) {
        validationError[valerr] = error.errors[valerr].message;
      }
      return reject(validationError);
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

    // return resolve(user);
    console.log(user.password);
    console.log(bcrypt.compareSync(user.password, password));
    if (bcrypt.compareSync(user.password, password)) {
      return resolve({
        token: jwt.sign({ email: user.email, _id: user._id }, "RESTFULAPIs"),
      });
    } else {
      return reject();
    }
  });
};
