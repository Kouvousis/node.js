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

describe("For /api/users/ requests", () => {});

describe("For /api/users/:username requests", () => {});
