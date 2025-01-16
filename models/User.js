// models/product.model.js
const mongoose = require("mongoose");

const Users = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true },
        senha: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", Users);
