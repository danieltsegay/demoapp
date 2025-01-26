// import the express module
const express = require('express');
// import the mysql2 module
const mysql = require('mysql2');
// import the cors module
const cors = require('cors');
// create an express application
const app = express();

// define the conncetion to the database
const dbConfig = {
    connectionLimit: 10,
    password: '123456',
    user: "demoapp",
    host: 'localhost',
    database: 'demoapp'
}
// create the connection to the database
const connection = mysql.createConnection(dbConfig);
// connect to the database
connection.connect((err) => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
  console.log('Connected to the database');
});
// Use CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
// parse the request body as JSON
app.use(express.json());

// create a simple get request handler to send a response back to the client
app.get('/', (req, res) => {
  res.send('Testing!');
}); 
// post request handler to add a new employee to the database
app.post('/add-employee', (req, res) => {
  console.log(req.body);
  // write the sql query to add to the database table named employee_test
const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES ('${req.body.first_name}','${req.body.last_name}', '${req.body.email}','${req.body.password}')`;
// execute the query
connection.query(sql, (err, result) => {
  if (err) {
    console.error('An error occurred while executing the query:', err);
    res.status(500).json({ status: 'error', message: 'Failed to add employee' });
      return;
  }
  console.log('Employee added successfully');
  res.status(200).json({ status: 'success', message: 'Employee added successfully' });
}); 
}); 
// post request handler to login an employee which comes to this route
app.post('/login', (req, res) => {
  console.log(req.body);
// write the sql querry to retrieve the employee with the email and password provided by the user and compare it with the data in the database
const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
// execute the query
connection.query(sql, (err, result) => {
  if (err) {
    console.error('An error occurred while executing the query:', err);
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

// set up the port to listen to
const port = 4000;
// set up the listener to the port  and log the message
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



