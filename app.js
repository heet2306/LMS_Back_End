require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require("./routes/categoryRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/transactions', transactionRoutes);
app.use("/api/categories", categoryRoutes);

app.get('/', (req, res) => res.send('Library Management System API'));

module.exports = app;
