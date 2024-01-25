import request from "supertest";
import app from "../app";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
let accessTokenUser1;
let blogpostUser1;
let blogpostUser2;
let blogpostId;
let accessTokenUser2;
//TEST REGISTER AND LOGIN
describe("Register and Login", () => {
  test("Test:Register user 1", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "demo1@gmail.com",
      password: "1234",
      name: "demo",
    });
    expect(response.body.code).toBe("AUTHR");
    expect(response.status).toBe(201);
  });
  test("Test:Register user 2", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "demo2@gmail.com",
      password: "1234",
      name: "demo",
    });
    expect(response.body.code).toBe("AUTHR");
    expect(response.status).toBe(201);
  });

  test("Test: Already Register User", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "demo1@gmail.com",
      password: "1234",
      name: "demo",
    });
    expect(response.body.code).toBe("UAE");
    expect(response.status).toBe(403);
  });

  test("Test: Login with correct email and password for user 1", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "demo1@gmail.com",
      password: "1234",
    });

    expect(response.status).toBe(200);
    accessTokenUser1 = response.body.data.accessToken;
  });
  test("Test: Login with correct email and password for user 2", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "demo2@gmail.com",
      password: "1234",
    });
    jwt.verify(response.body.data.accessToken, "RESTFULAPIs", (err, user) => {
      blogpostUser2 = user._id;
    });

    expect(response.status).toBe(200);
    accessTokenUser2 = response.body.data.accessToken;
  });
  test("Test: Login with incorrect email and password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "demo@gmail.com",
      password: "12342",
    });

    expect(response.status).toBe(403);
  });
});
describe("CRUD", () => {
  test("Test: Create Post", async () => {
    const blogpost = {
      title: "Java Advance & C++ ",
      author: "Pravin Nichal",
      content:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
      tags: ["Marketing", "Programming"],
    };
    const response = await request(app)
      .post("/blogposts")
      .set("Authorization", `Bearer ${accessTokenUser1}`)
      .send(blogpost);
    blogpostId = response.body.data._id;
    blogpostUser1 = response.body.data.user;
    expect(response.status).toBe(201);
  });
  test("Test :Get All Posts", async () => {
    const response = await request(app)
      .get("/blogposts")
      .set("Authorization", `Bearer ${accessTokenUser1}`);
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  test("Test: Get By Id", async () => {
    const response = await request(app)
      .get("/blogposts/" + blogpostId)
      .set("Authorization", `Bearer ${accessTokenUser1}`);

    expect(response.status).toBe(200);
  });

  test("Test: Update post", async () => {
    const blogpost = {
      title: "Nodejs ",

      content: "HERE IS ",
      tags: ["Marketing", "Programming"],
      user: blogpostUser1,
    };
    const response = await request(app)
      .patch("/blogposts/" + blogpostId)
      .set("Authorization", `Bearer ${accessTokenUser1}`)
      .send(blogpost);
    console.log(response.body);
    expect(response.status).toBe(201);
  });

  test("Test: Update post with different user", async () => {
    const blogpost = {
      title: "Nodejs ",

      content:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
      tags: ["Marketing", "Programming"],
    };
    const response = await request(app)
      .patch("/blogposts/" + blogpostId)
      .set("Authorization", `Bearer ${accessTokenUser2}`)
      .send(blogpost);
    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.code).toBe("UAU");
  });

  test("Test: Delete Post", async () => {
    const id = "65a54c00a7d42ade191300a7";

    const response = await request(app)
      .delete("/blogposts/" + blogpostId)
      .set("Authorization", `Bearer ${accessTokenUser1}`);

    console.log(response.body);
    expect(response.status).toBe(201);
  });
});

describe("Validations", () => {
  test("Test: Save post without data", async () => {
    let blogpost = {};
    const response = await request(app)
      .post("/blogposts")
      .set("Authorization", `Bearer ${accessTokenUser1}`)
      .send(blogpost);
    console.log(response.body);
    expect(response.status).toBe(403);
  });
  test("Test: Save post without title", async () => {
    let blogpost = {
      author: "Pravin Nichal",
      content:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
      tags: ["Marketing", "Programming"],
    };
    const response = await request(app)
      .post("/blogposts")
      .set("Authorization", `Bearer ${accessTokenUser1}`)
      .send(blogpost);
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(403);
  });
});
test("DELETE USERS", async () => {
  await User.deleteOne({ _id: blogpostUser1 });
  await User.deleteOne({ _id: blogpostUser2 });
});
