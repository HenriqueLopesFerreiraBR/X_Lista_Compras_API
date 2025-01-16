const ShoppingList = require('../models/ShoppingList');
const Product = require('../models/Product');

class ShoppingListController {
    async create(req, res) {
        try {
            const { description, items } = req.body;

            // Processar itens para validar e buscar os ObjectIds de produtos
            const processedItems = await Promise.all(
                items.map(async (item) => {
                    // Buscar o produto pelo nome ou ID
                    const product = await Product.findOne({ name: item.product }) || await Product.findById(item.product);
                    
                    if (!product) {
                        throw new Error(`Produto não encontrado: ${item.product}`);
                    }

                    return {
                        product: product._id,
                        quantity: item.quantity,
                        price: item.price,
                    };
                })
            );

            // Calcular o total
            const total = processedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            // Criar a lista de compras
            const shoppingList = new ShoppingList({
                description,
                items: processedItems,
                total,
            });

            await shoppingList.save();
            res.status(201).json(shoppingList);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar lista de compras', error: error.message });
        }
    }

    async list(req, res) {
        try {
            const shoppingLists = await ShoppingList.find().populate('items.product');
            res.status(200).json(shoppingLists);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao listar listas de compras', error });
        }
    }
    async getID(req, res) {
        try {
            const id = req.params.id;
            const shoppingLists = await ShoppingList.findById(id).populate('items.product');
            res.status(200).json(shoppingLists);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao listar listas de compras', error });
        }
    }
}

module.exports = new ShoppingListController();
