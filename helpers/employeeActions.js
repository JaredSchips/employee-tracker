const inquirer = require('inquirer')
const db = require('../config/connection')
const roleActions = require('./roleActions')

const view = async () => {
    const [result, data] = await db.query('SELECT employee.id, employee.first_name, employee.last_name, title, salary, concat(manager.first_name, " ", manager.last_name) AS manager, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id')
    return result
}

const add = async () => {
    const employees = await view()
    const employeeChoices = employees.map(row => {return {
            name: row.first_name + ' ' + row.last_name,
            value: row.id
        }
    })
    employeeChoices.push({name: 'None', value: null})
    const roles = await roleActions.view()
    const roleChoices = roles.map(row => {return {
            name: row.title,
            value: row.id
        }
    })
    await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What is the employee\'s role?',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Who is the employee\'s manager?',
            choices: employeeChoices
        }
    ]).then(async responses => {
        const { firstName, lastName, roleId, managerId } = responses
        await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
        [firstName, lastName, roleId, managerId])
    })
}

const updateRole = async () => {
    const employees = await view()
    const employeeChoices = employees.map(row => {return {
            name: row.first_name + ' ' + row.last_name,
            value: row.id
        }
    })
    const roles = await roleActions.view()
    const roleChoices = roles.map(row => {return {
            name: row.title,
            value: row.id
        }
    })
    await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s role would you like to change?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What would you like to change their role to?',
            choices: roleChoices
        }
    ]).then(responses => {
        const { employeeId, roleId } = responses
        db.query('UPDATE employee SET role_id=? WHERE id=?',
        [roleId, employeeId])
        console.log(`Role updated.`)
    })
}

module.exports = { view, add, updateRole }