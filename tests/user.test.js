const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log("Connection to Mongo from Jest established");
    },
    (err) => {
      console.log("Failed to connect to Mongo from Jest");
    }
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Tests for /api/users/ requests", () => {
  it("GET /api/users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000); // 10000 is milliseconds until timeout
});

describe("For /api/users/{username} requests", () => {});
