import express from "express";
const app = express();
import postRouter from "./routes/blogpostroute.js";
import bodyParser from "body-parser";
import cors from "cors"



app.use(cors());
app.use(bodyParser.json());
const port = 4000;

app.use("/blogposts", postRouter);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "Route does not exists", data: {} });
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
