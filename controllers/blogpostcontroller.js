import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var filepath = path.join(__dirname, "..", "jsondatastore/blogpost.json");

export const getAllBlogPost = (req, res) => {
  fs.readFile(filepath, "utf8", function (err, data) {
    if (err && err.code == "ENOENT") {
      return res
        .status(404)
        .json({ status: 404, message: "No Posts Found", data: {} });
    }
    const jsonData = JSON.parse(data);
    res.status(201).json({
      status: 201,
      message: "Posts Fetched Successfully",
      data: jsonData,
    });
  });
};

export const getById = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    var blogposts = JSON.parse(data);
    var blogpost = blogposts[req.params.id];
    if (data.length == 0 || blogpost == undefined) {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    return res.status(201).json({
      status: 201,
      message: "Posts Fetched Successfully",
      data: blogpost,
    });
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
    }

    fs.writeFileSync(filepath, JSON.stringify(jsonData), (err) => {});

    return res.status(201).json({
      status: 201,
      message: "Post Inserted Successfully",
      data: res.locals.blogpost,
    });
  });
};
export const updateBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    data = JSON.parse(data);
    var blogpost = data[res.locals.blogpost.id];
    if (blogpost == undefined) {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    data[res.locals.blogpost.id] = res.locals.blogpost;

    fs.writeFile(filepath, JSON.stringify(data), (err) => {
      return res.status(201).json({
        status: 201,
        message: "Post Updated Successfully",
        data: res.locals.blogpost,
      });
    });
  });
};

export const deleteBlogPost = (req, res) => {
  fs.readFile(filepath, function (err, data) {
    if (err && err.code == "ENOENT") {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }

    data = JSON.parse(data);
    var blogpost = data[req.params.id];

    if (blogpost == undefined) {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    delete data[blogpost.id];
    if (Object.keys(data).length == 0) {
      fs.unlinkSync(filepath);
    } else {
      fs.writeFile(filepath, JSON.stringify(data), (err) => {});
    }
    return res.status(201).json({
      status: 201,
      message: "BlogPost" + req.params.id + "is Deleted Successfully",
      data: {},
    });
  });
};
