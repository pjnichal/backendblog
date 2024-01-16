import request from "supertest";
import app from "../app";
let accessToken;
//TEST REGISTER AND LOGIN
describe("Register and Login", () => {
  test("Test: Already Register User", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "demo@gmail.com",
      password: "1234",
      name: "demo",
    });
    expect(response.body.code).toBe("UAE");
    expect(response.status).toBe(403);
  });

  test("Test: Login with correct email and password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "demo@gmail.com",
      password: "1234",
    });

    expect(response.status).toBe(200);
    accessToken = response.body.data.accessToken;
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
  test("Test :Get All Posts", async () => {
    const response = await request(app)
      .get("/blogposts")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });
  test("Test: Get By Id", async () => {
    const id = "65a69eb649ea92886b8662a2";
    const response = await request(app)
      .get("/blogposts/" + id)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });
  // test("Test: Create Post", async () => {
  //   const blogpost = {
  //     title: "Java Advance & C++ ",
  //     author: "Pravin Nichal",
  //     content:
  //       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
  //     tags: ["Marketing", "Programming"],
  //   };
  //   const response = await request(app)
  //     .post("/blogposts")
  //     .set("Authorization", `Bearer ${accessToken}`)
  //     .send(blogpost);

  //   expect(response.status).toBe(201);
  // });
  test("Test: Update post", async () => {
    const id = "65a695dbdf7a6449df9a908f";
    const blogpost = {
      title: "Nodejs ",

      content: "HERE IS ",
      tags: ["Marketing", "Programming"],
      user: "65a659043eeebfff4d37b974",
    };
    const response = await request(app)
      .patch("/blogposts/" + id)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(blogpost);
    console.log(response.body);
    expect(response.status).toBe(201);
  });

  test("Test: Update post with different user", async () => {
    const id = "65a69eb649ea92886b8662a2";
    const blogpost = {
      title: "Nodejs ",

      content:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
      tags: ["Marketing", "Programming"],
    };
    const response = await request(app)
      .patch("/blogposts/" + id)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(blogpost);
    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.code).toBe("UAU");
  });

  test("Test: Delete Post", async () => {
    const id = "65a54c00a7d42ade191300a7";

    const response = await request(app)
      .delete("/blogposts/" + id)
      .set("Authorization", `Bearer ${accessToken}`);

    console.log(response.body);
    expect(response.status).toBe(404);
  });
});

describe("Validations", () => {
  test("Test: Save post without data", async () => {
    let blogpost = {};
    const response = await request(app)
      .post("/blogposts")
      .set("Authorization", `Bearer ${accessToken}`)
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
      .set("Authorization", `Bearer ${accessToken}`)
      .send(blogpost);
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(403);
  });
});
