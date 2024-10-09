const User = require("../models/user.model");

async function findLastInsertedUser() {
  console.log("Find last inserted user");

  try {
    const result = await User.find({}).sort({ _id: -1 }).limit(1);
    return result[0];
  } catch (err) {
    console.log("Problem in finding last inserted user");
  }
}

// async function findUsersProduct(username, _id) {
//   console.log("Find user's product", username, _id);

//   try {
//     const result = User.findOne(
//       {
//         username: username,
//         "products._id": _id,
//       },
//       { username: 1, "products.$": 1 }
//     );
//     return result;
//   } catch (err) {
//     console.log("Problem in finding user's product");
//     return false;
//   }
// }

async function findUsersProduct(username) {
  console.log("Find user's product", username);

  try {
    const result = User.findOne(
      { username: username },
      { username: 1, products: 1 }
    );
    return result;
  } catch (err) {
    console.log("Problem in finding user's product");
    return false;
  }
}

module.exports = { findLastInsertedUser, findUsersProduct };
