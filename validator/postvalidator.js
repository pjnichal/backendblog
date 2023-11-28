export const postvalitor = (req, res, next) => {
  console.log("MiddleWareCalled");
  next();
};
