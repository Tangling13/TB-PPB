const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/users/signup", userController.signup);

router.post("/users/signin", userController.signin);

router.delete("/users/:userId", userController.delete);

module.exports = router;
