// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create an express application
const app = express();

// Define the connection pool to the database
const dbConfig = {
    connectionLimit: 10,
    password: '123456',
    user: "demoapp",
    host: 'localhost',
    database: 'demoapp'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Use CORS middleware
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Parse the request body as JSON
app.use(express.json());

// Create a simple GET request handler
app.get('/', (req, res) => {
    res.send('Testing!');
});

// POST request handler to add a new employee
app.post('/add-employee', (req, res) => {
    console.log(req.body);

    // SQL query to insert employee data
    const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    const values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password];

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            res.status(500).json({ status: 'error', message: 'Database connection failed' });
            return;
        }

        connection.query(sql, values, (err, result) => {
            connection.release(); // Always release the connection back to the pool
            if (err) {
                console.error('Query execution error:', err);
                res.status(500).json({ status: 'error', message: 'Failed to add employee' });
                return;
            }
            console.log('Employee added successfully');
            res.status(200).json({ status: 'success', message: 'Employee added successfully' });
        });
    });
});

// POST request handler for employee login
app.post('/login', (req, res) => {
    console.log(req.body);

    // SQL query to check user credentials
    const sql = `SELECT * FROM employee_test WHERE email = ? AND password = ?`;
    const values = [req.body.email, req.body.password];

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            res.status(500).json({ status: 'error', message: 'Database connection failed' });
            return;
        }

        connection.query(sql, values, (err, result) => {
            connection.release();
            if (err) {
                console.error('Query execution error:', err);
                res.status(500).json({ status: 'error', message: 'Failed to log in' });
                return;
            }
            if (result.length > 0) {
                console.log('Employee logged in successfully');
                return res.status(200).json({
                    status: 'success',
                    message: 'Employee logged in successfully'
                });
            } else {
                console.log('Invalid email or password');
                return res.status(401).json({
                    status: 'failure',
                    message: 'Invalid email or password'
                });
            }
        });
    });
});

// Set up the port and start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
