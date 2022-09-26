INSERT INTO department(department_name)
VALUES ("Engineering"),1
       ("Finance"),2
       ("Legal"),3
       ("Sales");4

INSERT INTO roles(title, salary, id)
VALUES ("Sales Lead", 100000,  4),1
       ("Salesperson", 80000, 4),2
       ("Lead Engineer", 150000, 1)3,
       ("Software Engineer", 120000, 1),4
       ("Account Manager", 160000, 2),5
       ("Accountant", 125000, 2),6
       ("Legal Team Lead", 250000, 3),7
       ("Lawyer", 190000, 3);8


INSERT INTO employee(first_name,last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, null),
       ("Keven", "Tupik", 4, null),       
       ("Kunal", "Singh", 5, null),
       ("Malia", "Brown", 6, null),
       ("Sarah", "Lourd", 7, null),
       ("Tom", "Allen", 8, null);