import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var filepath = path.join(__dirname, "..", "jsondatastore/blogpost.json");

export const getAllBlogPost = (req, res) => {
  fs.readFile(filepath, "utf8", function (err, data) {
    console.log(err);
    if (data.length == 0) {
      res.json({ message: "No Posts Found" });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
};

export const getById = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (data.length == 0) {
      res.json({ message: "No Posts Found" });
    }
    var blogposts = JSON.parse(data);
    var blogpost = blogposts[req.params.id];
    if (data.length == 0 || blogpost == undefined) {
      res.json({
        message: "BlogPost for given id " + req.params.id + " Not Found",
      });
    }

    res.json(blogpost);
  });
};

export const saveBlogPost = (req, res) => {
  var jsonData = {};
  fs.readFile(filepath, function (err, data) {
    if (data.length == 0) {
      const key = res.locals.blogpost.id;
      const value = res.locals.blogpost;
      jsonData[key] = value;
      console.log(jsonData);
    } else {
      jsonData = JSON.parse(data);

      jsonData[res.locals.blogpost.id] = res.locals.blogpost;
      console.log(jsonData);

      console.log("here");
    }
    fs.writeFile(filepath, JSON.stringify(jsonData), (err) => {
      if (err) {
        res.send({ message: err.message });
      }
    });

    res.json(res.locals.blogpost);
  });
};
export const updateBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (data.length == 0) {
      res.json({ message: "No Posts Found" });
    }
    data = JSON.parse(data);
    var blogpost = data[res.locals.blogpost.id];
    if (blogpost == undefined) {
      res.json({
        message:
          "BlogPost for given id " + res.locals.blogpost.id + " Not Found",
      });
    } else {
      data[res.locals.blogpost.id] = res.locals.blogpost;
      console.log(data);
      fs.writeFile(filepath, JSON.stringify(data), (err) => {
        console.log("here");
        res.json(data);
      });
    }
  });
};

export const deleteBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (data.length == 0) {
      res.json({ message: "No Posts Found" });
    }

    data = JSON.parse(data);
    var blogpost = data[req.params.id];

    if (blogpost == undefined) {
      res.json({
        message: "BlogPost for given id " + req.params.id + " Not Found",
      });
    }
    delete data[blogpost.id];

    console.log(data);
    fs.writeFile(filepath, JSON.stringify(data), (err) => {});
    res.json(data);
  });
};
