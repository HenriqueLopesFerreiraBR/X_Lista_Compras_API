// controllers/product.controller.js
const Product = require('../models/Product');

class ProductController {
    // Criar um novo produto
    async create(req, res) {
        try {
            const { name, price } = req.body;

            // Verificar se o produto já existe pelo nome
            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                return res.status(400).json({ message: 'Produto já existe com esse nome' });
            }

            const product = new Product({ name, price });
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar produto', error });
        }
    }

    // Listar todos os produtos
    async list(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar produtos', error });
        }
    }

    // Buscar Id
    async getbyId(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar produtos', error });
        }
    }

    // Atualizar um produto
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price } = req.body;

            // Verificar se o nome já está em uso por outro produto
            const existingProduct = await Product.findOne({ name, _id: { $ne: id } });
            if (existingProduct) {
                return res.status(400).json({ message: 'Outro produto já usa esse nome' });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, price },
                { new: true } // Retorna o documento atualizado
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar produto', error });
        }
    }

    // Excluir um produto
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.status(200).json({ message: 'Produto excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir produto', error });
        }
    }
}

module.exports = new ProductController();