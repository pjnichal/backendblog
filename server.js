import express from "express";
const app = express();
import postRouter from "./routes/blogpostroute.js";

import cors from "cors"
import mongoose from "mongoose";



app.use(cors());
app.use(express.json());
const port = 4000;

mongoose
.connect("mongodb+srv://romrombhaiyo:pravin@blogsapp.jq89wvg.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("Connected to Mongo DB Successfully."))
.catch((err)=>console.log("Failed to connect with Mongo DB:",err));

app.use("/blogposts", postRouter);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "Route does not exists", data: {} });
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
