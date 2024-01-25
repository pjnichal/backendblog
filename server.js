import express from "express";
const app = express();
import postRouter from "./routes/blogpostroute.js";
import authRouter from "./routes/authroute.js";
import cors from "cors";
import mongoose from "mongoose";

app.use(cors());
app.use(express.json());
const port = 4000;

mongoose
  .connect("mongodb://localhost:27017/blogapp")
  .then(() => console.log("Connected to Mongo DB Successfully."))
  .catch((err) => console.log("Failed to connect with Mongo DB:", err));

app.use("/blogposts", postRouter);
app.use("/auth", authRouter);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "Route does not exists", data: {} });
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
