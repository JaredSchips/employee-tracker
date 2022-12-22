INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('HR'),
    ('Security');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Representative', 15, 1),
    ('Sales Manager', 20, 1),
    ('HR Representative', 15, 2),
    ('Security Guard', 25, 3),
    ('Security Manager', 20, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mary', 'Jane', 2, NULL),
    ('Jack', 'Smith', 3, NULL),
    ('Jane', 'Schmidt', 5, NULL),
    ('John', 'Doe', 1, 1),
    ('Jill', 'Morgan', 4, 3),
    ('Steve', 'Johnson', 4, 3);