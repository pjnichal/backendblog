import request from "supertest";
import app from "../app";
let accessToken;
describe("GET /auth/login", () => {
  test("It should response with jwt token", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "nichal.pra@gmail.com",
      password: "1234",
    });

    expect(response.status).toBe(201);
    accessToken = response.body.data.accessToken;
  });
  test("Access protected endpoint with valid token", async () => {
    const response = await request(app)
      .get("/blogposts")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(201);
  });
});
