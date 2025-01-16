// models/shoppingList.model.js
const mongoose = require('mongoose');
const Product = require('./Product')

const ShoppingListSchema = new mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);