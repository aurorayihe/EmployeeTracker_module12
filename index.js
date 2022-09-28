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
    choices: ['View all departments', 'View all roles', 'View all employees',
            'Add a department', 'Add a role', 'Add an employee', 'Update an employee role',
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

            case 'View all employees':
              viewAllEmployees();
              break;

            case 'Add a department':
              addDepartment();
              break;
            
            case 'Add a role':
              addRole();
              break;

            case 'Add an employee':
              addEmployee();
              break;
            
            case 'Update an employee role':
              updateEmployeeRole();
              break;

            case 'quit':
              console.log('Bye!');
              process.exit(0);
          }
        })
}
  // View all departments
function viewAllDepartments() {
    const sql = `SELECT department_id AS ID, department_name AS Department FROM department`;

    db.query(sql, (err, data) => {
        if (err) throw err;
        console.table(data);
        checkStatus();
    })
}

  // View all roles
function viewAllRoles() {
    const sql = `SELECT roles.role_id AS ID, roles.title AS Title,  department.department_name AS Department,  roles.salary 
    FROM roles
    JOIN department ON roles.department_id = department.department_id 
    ORDER BY roles.role_id ASC`

    db.query(sql, (err, data) => {
        if (err) throw err;
        console.table(data);
        checkStatus();
    })
}
  //View all employees
function viewAllEmployees() {
    const sql = `SELECT e.employee_id AS ID, e.first_name AS "First Name", e.last_name AS "Last Name", 
    r.title AS "Title", d.department_name AS "Department", 
    r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
    FROM employee e
    LEFT JOIN roles r ON r.role_id = e.role_id 
    LEFT JOIN department d ON d.department_id = r.department_id
    LEFT JOIN employee m ON m.manager_id = e.manager_id
    ORDER BY e.employee_id ASC;`

    db.query(sql, (err, data) => {
        if (err) throw err;
        console.table(data);
        checkStatus();
    })
}

  // Add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name:'newDepartment',
        message: 'What is the name of the department?'
      }
    ])
    .then((answer) => {
      const sql = `INSERT INTO department(department_name) 
      VALUE ("${answer.newDepartment}");`
      db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(`Department "${answer.newDepartment}" added to the database!`);
        checkStatus();
      })

    })
}

  // Add a role
function addRole() {
  db.query('SELECT * FROM department;', (err, data) => {
    if (err) throw err;
    const choices = data.map(department => department.department_name);
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: choices
      }
    ])
    .then((answer) => {
      const sql = `INSERT INTO roles(title, salary, department_id)
      VALUES ("${answer.roleName}", ${answer.salary}, (SELECT department_id FROM department WHERE department_name = "${answer.department}"));`
      db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(`Role "${answer.roleName}" added to the database!`);
        checkStatus();
      })
    })
  })
}
  // Add an employee
function addEmployee() {
  db.query('SELECT * FROM roles', (err, role) => {
    if (err) throw err;
    const roles = role.map(role => role.title);
    db.query('SELECT first_name, last_name FROM employee', (err, employee) => {
      if (err) throw err;
      const possibleManager = employee.map(employee => (employee.first_name + ' ' + employee.last_name));
      possibleManager.push('Null');

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's first name?`
          },
          {
            type:'input',
            name: 'last_name',
            message: `What's the employee's last name?`
          },
          {
            type:'list',
            name:'role',
            choices:roles,
          },
          {
            type: 'list',
            name:'manager',
            message: `Who is the employee's manager?`,
            choices: possibleManager
          }
        ])
        .then((answer) => {
            const sql = `INSERT INTO employee(first_name, last_name, role_id)
            VALUES
                ("${answer.first_name}", "${answer.last_name}",
                (SELECT role_id FROM roles WHERE title = "${answer.role}"));`
             db.query(sql, (err, data) => {
                if (err) throw err;
                console.log(`Employee "${answer.first_name}" added to the database!`);
                checkStatus();
              })
             console.log('yes');
        })
    })
  })
}

  //Update an employee role
function updateEmployeeRole() {
  db.query('SELECT * FROM roles', (err, role) => {
    if (err) throw err;
    const roles = role.map(role => ({ name: role.title, value: role.role_id }));
    db.query('SELECT first_name, last_name FROM employee', (err, data) => {
      if (err) throw err;
      const employee = data.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value:employee.employee_id}));
      inquirer
          .prompt([
            {
              type: 'list',
              name: 'name',
              message: `Which employee's role do you want to update?`,
              choices: employee
            },
            {
              type: 'list',
              name: 'newRole',
              message: 'Which role do you want to assign the selected employee?',
              choices: roles
            }
          ])
          .then((answer) => {
            console.log(answer);
            const sql = `UPDATE employee SET role_id = ${answer.newRole} WHERE employee_id: ${answer.name.value}`;
        /*    db.query(sql, (err, data) => {
              if(err) throw err;
              console.log("Employee's Role successfully updated!");
              checkStatus();*/
            })
          })
      })
  };

checkStatus()