INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("${answer.first_name}", "${answer.last_name}",
    (SELECT role_id FROM roles WHERE title = "${answer.role}"),
    (SELECT employee_id FROM employee WHERE (first_name + ' ' + last_name) = "${answer.manager}"),);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("${answer.first_name}", "${answer.last_name}",
    (SELECT role_id FROM roles WHERE title = "${answer.role}"),
    (SELECT employee_id FROM (SELECT employee_id FROM employee WHERE (first_name + ' ' + last_name) = "${answer.manager}")),);