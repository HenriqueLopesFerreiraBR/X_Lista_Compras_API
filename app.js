// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {connectDB} = require('./database/db');
const productRoutes = require('./routes/ProductRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const UserRoutes = require('./routes/usersRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/shoppingLists', shoppingListRoutes);
app.use('/api/users', UserRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
