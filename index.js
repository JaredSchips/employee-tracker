inquirer = require('inquirer')
const db = require('./config/connection')

const actions = [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Departments',
    'Quit'
]

const menu = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: actions
        }
    ).then(responses => {
        const { action } = responses
    })
}

menu()