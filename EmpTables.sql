DROP DATABASE IF EXISTS EmployeeTracker_db; 
CREATE DATABASE EmployeeTracker_db;
USE EmployeeTracker_db;

CREATE TABLE department(
    id INTEGER(11) NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER(11),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER(11), 
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INTEGER(11),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11)
);

INSERT INTO department(id, name) VALUES (1, "Sales"), (2, "Engineering"),(3,"Finance");

INSERT INTO role(id, title, salary, department_id) VALUES (1, "Sales Lead", 100000, 1), (2, "Lead Engineer", 125000, 2), (3, "Accountant", 80000, 3), (4, "Sales Intern", 35000, 1);

INSERT INTO employee(id, first_name, last_name, role_id) VALUES (1, "John", "Smith", 1), (2, "Jane", "Smith", 2), (3, "Sally", "Smith", 3), (4, "Jimmy", "Smith", 4);

SELECT r.title, r.salary, e.first_name, e.last_name
FROM role AS r
RIGHT JOIN employee AS e ON r.id = e.role_id;


