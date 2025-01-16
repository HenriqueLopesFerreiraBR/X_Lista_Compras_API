const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

// Rotas para usuários
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.get("/name/:nome", UsersController.getByName);
router.put("/:id", UsersController.update);
router.delete("/:id", UsersController.delete);

module.exports = router;
