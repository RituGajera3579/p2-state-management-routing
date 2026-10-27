const request = require("supertest");
const app = require("../server");

describe("Task Manager API", () => {
  test("GET / should return API running message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Wrong message for testing failure");
  });

  test("GET /cache-stats should return cache statistics", async () => {
    const response = await request(app).get("/cache-stats");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("keys");
    expect(response.body).toHaveProperty("ttl", 60);
  });
});