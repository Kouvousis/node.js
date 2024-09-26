const User = require("../models/user.model");

exports.findAll = async (req, res) => {
  console.log("Find all products from all users");

  try {
    const result = await User.find({}, { username: 1, products: 1, _id: 0 });
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.findOne = async (req, res) => {
  const username = req.params.username;
  console.log("Find all products of user with username: ", username);

  try {
    const result = await User.findOne(
      { username: username },
      { username: 1, products: 1, _id: 0 }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.create = async (req, res) => {
  const username = req.body.username;
  const products = req.body.products;
  console.log("Insert products to user with username: ", username);

  try {
    const result = await User.updateOne(
      { username: username },
      {
        $push: {
          products: products,
        },
      }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.update = async (req, res) => {
  const username = req.params.username;
  const productId = req.body.product._id;
  const productQuantity = req.body.product.quantity;
  console.log("Update product quantity for user with username ", username);

  try {
    const result = await User.updateOne(
      { username: username, "products._id": productId },
      {
        $set: {
          "products.$.quantity": productQuantity,
        },
      }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.delete = async (req, res) => {
  const username = req.params.username;
  const productId = req.params.id;
  console.log("Delete product from user ", username);

  try {
    const result = await User.updateOne(
      { username: username },
      {
        $pull: {
          products: { _id: productId },
        },
      }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};
