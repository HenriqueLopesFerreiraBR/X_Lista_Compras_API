const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.post('/', (req, res) => ProductController.create(req, res));//Cadastrar um produto
router.get('/', (req, res) => ProductController.list(req, res));//Listar todos
router.put('/:id', (req, res) => ProductController.update(req, res)); // Atualizar produto
router.delete('/:id', (req, res) => ProductController.delete(req, res)); // Excluir produto


module.exports = router;
