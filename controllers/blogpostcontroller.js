import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var filepath = path.join(__dirname, "..", "jsondatastore/blogpost.json");

export const getAllBlogPost = (req, res) => {
  fs.readFile(filepath, "utf8", function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.json({ message: "No Posts Found" });
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
};

export const getById = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.json({ message: "No Posts Found" });
    }
    var blogposts = JSON.parse(data);
    var blogpost = blogposts[req.params.id];
    if (data.length == 0 || blogpost == undefined) {
      return res.json({
        message: "BlogPost for given id " + req.params.id + " Not Found",
      });
    }
    return res.json(blogpost);
  });
};

export const saveBlogPost = (req, res) => {
  fs.readFile(filepath, (err, data) => {
    var jsonData = {};
    if (err && err.code == "ENOENT") {
      const key = res.locals.blogpost.id;
      const value = res.locals.blogpost;
      jsonData[key] = value;
    } else {
      jsonData = JSON.parse(data);
      jsonData[res.locals.blogpost.id] = res.locals.blogpost;
      console.log("here");
    }
    console.log(jsonData);
    fs.writeFileSync(filepath, JSON.stringify(jsonData), (err) => {});

    return res.json(res.locals.blogpost);
  });
};
export const updateBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.json({ message: "No Posts Found" });
    }
    data = JSON.parse(data);
    var blogpost = data[res.locals.blogpost.id];
    if (blogpost == undefined) {
      return res.json({
        message:
          "BlogPost for given id " + res.locals.blogpost.id + " Not Found",
      });
    }
    data[res.locals.blogpost.id] = res.locals.blogpost;
    console.log(data);
    fs.writeFile(filepath, JSON.stringify(data), (err) => {
      console.log("here");
      return res.json(res.locals.blogpost);
    });
  });
};

export const deleteBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.json({ message: "No Posts Found" });
    }

    data = JSON.parse(data);
    var blogpost = data[req.params.id];
    console.log(blogpost);
    if (blogpost == undefined) {
      return res.json({
        message: "BlogPost for given id " + req.params.id + " Not Found",
      });
    }
    delete data[blogpost.id];
    if (Object.keys(data).length == 0) {
      console.log("here");
      fs.unlinkSync(filepath);
    } else {
      console.log(data);
      fs.writeFile(filepath, JSON.stringify(data), (err) => {});
    }
    res.json({
      message: "BlogPost for given id " + req.params.id + " is Deleted",
    });
  });
};
