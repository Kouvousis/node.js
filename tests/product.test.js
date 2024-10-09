const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const helpers = require("../services/product.service");

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

describe("Tests for /api/products/ requests", () => {
  it("GET /api/products requests", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000); // 10000 is milliseconds until timeout

  it("POST /api/products requests", async () => {
    const res = await request(app).post("/api/products").send({
      product: "testProd",
      cost: "1",
      description: "This is a test product",
      quantity: "1",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeTruthy();
  });

  it("POST /api/products requests checks for existing product", async () => {
    const res = await request(app).post("/api/users").send({
      product: "testProd",
      cost: "1",
      description: "This is a test product",
      quantity: "1",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeFalsy();
  });
});

describe("Tests for /api/products/{product} requests", () => {
  it("GET /api/products/{product}", async () => {
    const result = await helpers.findLastInsertedProduct();
    console.log(result.product);
    const res = await request(app).get("/api/products/" + result.product);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.product).toBe(result.product);
  });
});

describe("Tests for /api/products/{id} requests", () => {
  it("PATCH for /api/products/{id}", async () => {
    const result = await helpers.findLastInsertedProduct();
    const res = await request(app)
      .patch("/api/products/" + result._id)
      .send({
        product: "newTestProd",
        cost: "2",
        description: "This is a new test product",
        quantity: "2",
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.product).toBe("newtestprod"); // lowercase and trim is true on model
  });

  it("DELETE /api/products/{id}", async () => {
    const result = await helpers.findLastInsertedProduct();
    const res = await request(app).delete("/api/products/" + result._id);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  });
});
