const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

class UsersController {
    // Método para registrar um usuário
    async register(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }

            const existingUser = await Users.findOne({email:email});
            if (existingUser) {
                return res.status(400).json({ message: "Email já está em uso." });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);
            const user = new Users({ nome, email, senha: hashedPassword });

            await user.save();
            res.status(201).json({ message: "Usuário registrado com sucesso." });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao registrar usuário.", error });
        }
    }

    // Método para login
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: "Email e senha são obrigatórios." });
            }

            const user = await Users.findOne({ email:email });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });
            res.status(200).json({ token, message: "Login realizado com sucesso." });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao realizar login.", error });
        }
    }

    // Método para obter todos os usuários
    async getAll(req, res) {
        try {
            const users = await Users.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuários.", error });
        }
    }

    // Método para obter usuário por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuário por ID.", error });
        }
    }

    // Método para obter usuário por nome
    async getByName(req, res) {
        try {
            const { nome } = req.params;
            const user = await Users.findOne({ nome });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuário por nome.", error });
        }
    }

    // Método para atualizar um usuário
    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            if (updates.senha) {
                updates.senha = await bcrypt.hash(updates.senha, 10);
            }

            const user = await Users.findByIdAndUpdate(id, updates, { new: true });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar usuário.", error });
        }
    }

    // Método para deletar um usuário
    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            res.status(200).json({ message: "Usuário deletado com sucesso." });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar usuário.", error });
        }
    }
}

module.exports = new UsersController();
