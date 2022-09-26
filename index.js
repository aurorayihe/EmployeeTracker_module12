const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '15064097616Wj.',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

const question = [{
    type: 'list',
    name: 'choice',
    Message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'view all employees',
            'add a department', 'add a role', 'add an employee', 'update an employee role',
            'quit']
}]

function checkStatus() {
    inquirer
        .prompt(question)
        .then((answer) => {
          switch (answer.choice) {
            case 'View all departments':
              viewAllDepartments();
              break;
            case 'View all roles':
              viewAllRoles();
              break;
            case 'quit':
              console.log('Bye!');
              process.exit(0);
          }
        })
}
  // View all departments
function viewAllDepartments() {
    const sql = `SELECT id, department_name FROM department`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        console.table(data);
        checkStatus();
    })
}

  // View all roles
function viewAllRoles() {
    const sql = `SELECT title, role_id, department_id, salary FROM roles;
    JOIN department.department_name ON roles.department_id = department.id`
    db.query(sql, (err, data) => {
        if (err) throw err;
        console.table(data);
        checkStatus();
    })
}
  //View all employees


  // Add a department

  // Add a role

  // Add an employee

  //Update an employee role

checkStatus();