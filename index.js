const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Connection to MongoDB established");
  },
  (err) => {
    console.log("Failed to connect to MongoDB");
  }
);

app.listen(port, () => {
  console.log("Server is running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

const user = require("./routes/user.routes");
app.use("/api/users", user);

const userProduct = require("./routes/user.product.routes");
app.use("/api/user-product", userProduct);

const product = require("./routes/product.routes");
app.use("/api/products", product);
