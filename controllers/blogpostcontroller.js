import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var filepath = path.join(__dirname, "..", "jsondatastore/blogpost.json");

export const getAllBlogPost = (req, res) => {
  console.log(__dirname);
  fs.readFile(filepath, "utf8", function (err, data) {
    if (err) {
      res.send("No Blog Post");
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
};

export const getById = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    var users = JSON.parse(data);
    var user = users["user" + req.params.id];
    console.log(user);
    res.json(user);
  });
};

export const saveBlogPost = (blogpost, res) => {
  fs.readFile(filepath, function (err, data) {
    data = JSON.parse(data);

    data[blogpost] = blogpost;
    console.log(data);
    fs.writeFile(filepath, JSON.stringify(data), (err) => {});
    console.log("here");
    res.json(data);
  });
};
export const updateBlogPost = (blogpost, res) => {
  fs.readFile(filepath, function (err, data) {
    data = JSON.parse(data);

    data[blogpost.id] = blogpost;
    console.log(data);
    fs.writeFile(filepath, JSON.stringify(data), (err) => {
      console.log("here");
      res.json(data);
    });
  });
};

export const deleteBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    data = JSON.parse(data);
    delete data["user" + req.params.id];

    console.log(data);
    fs.writeFile(filepath, JSON.stringify(data), (err) => {});
    res.json(data);
  });
};
