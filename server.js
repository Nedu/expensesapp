const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mysql = require("mysql");

const server = express();
const corsOptions = {
  origin: '*',
  credentials: true,
};

const expensesRoutes = require('./api/routes/expenses');

// Middlewares
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

//Database connection
server.use((req, res, next) => {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'expenses',
        password: 'root'
    });
    res.locals.connection.connect();
    next();
});

// Route Handlers
server.use('/', expensesRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));

module.exports = server;