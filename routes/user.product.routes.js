const express = require("express");
const router = express.Router();
const userProductController = require("../controllers/user.product.controller");

router.get("/users/products", userProductController.findAll);
router.get("/:username/products", userProductController.findOne);
router.post("/:username/products", userProductController.create);
router.patch("/:username", userProductController.update);
router.delete("/:username/products/:id", userProductController.delete);
router.get("/stats1", userProductController.stats1);
router.get("/:username/stats2", userProductController.stats2);

module.exports = router;
