const express = require('express');
const ShoppingListController = require('../controllers/ShoppingListController');

const router = express.Router();

router.post('/', (req, res) => ShoppingListController.create(req, res));
router.get('/', (req, res) => ShoppingListController.list(req, res));
router.get('/:id', (req, res) => ShoppingListController.getID(req, res));

module.exports = router;
