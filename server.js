const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const questions = [
    {
        type: 'list',
        name: 'action',
        Message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'view all employees',
                'add a department', 'add a role', 'add an employee', 'update an employee role',
                'quit']
    }
]

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

