import request from "supertest";
import app from "../app";
let accessToken;
describe("Register and Login", () => {
  // test("Test Register", async () => {
  //   const response = await request(app).post("/auth/register").send({
  //     email: "demo1@gmail.com",
  //     password: "1234",
  //     name: "demo",
  //   });

  //   expect(response.status).toBe(201);
  // });

  test("Test Login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "demo@gmail.com",
      password: "12341",
    });

    expect(response.status).toBe(201);
    accessToken = response.body.data.accessToken;
  });
});
describe("Protected Route", () => {
  test("Get All Posts", async () => {
    const response = await request(app)
      .get("/blogposts")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(201);
  });
});
