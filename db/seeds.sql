INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('HR'),
    ('Security');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Representative', 80000, 1),
    ('Sales Manager', 100000, 1),
    ('HR Representative', 80000, 2),
    ('Security Guard', 80000, 3),
    ('Security Manager', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mary', 'Jane', 2, NULL),
    ('Jack', 'Smith', 3, NULL),
    ('Jane', 'Schmidt', 5, NULL),
    ('John', 'Doe', 1, 1),
    ('Jill', 'Morgan', 4, 3),
    ('Steve', 'Johnson', 4, 3);