SELECT roles.id, roles.title,  department.name AS department, roles.salary 
FROM roles
JOIN department.name ON department.id = roles.department_id;
