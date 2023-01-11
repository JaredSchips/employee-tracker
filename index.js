inquirer = require('inquirer')
const db = require('./config/connection')
const cTable = require('console.table')
const { employeeActions, roleActions, departmentActions } = require('./helpers/actions')

const actions = [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Department',
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
    ).then(async responses => {
        const { action } = responses
        switch (action) {
            case 'View All Employees':
                const employees = await employeeActions.view()
                console.table(employees)
                return menu()
            
            case 'Add Employee':
                await employeeActions.add()
                return menu()
            
            case 'Update Employee Role':
                await employeeActions.updateRole()
                return menu()
            
            case 'View All Roles':
                const roles = await roleActions.view()
                console.table(roles)
                return menu()
            
            case 'Add Role':
                await roleActions.add()
                return menu()
            
            case 'View All Departments':
                const departments = await departmentActions.view()
                console.table(departments)
                return menu()
            
            case 'Add Department':
                await departmentActions.add()
                return menu()
            
            case 'Quit':
                process.exit()
            
            default:
                break;
        }
    })
}

menu()