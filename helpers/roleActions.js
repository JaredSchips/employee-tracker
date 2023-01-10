inquirer = require('inquirer')
const db = require('../config/connection')
const departmentActions = require('./departmentActions')

const view = async () => {
    const [result, data] = await db.query('SELECT role.id, title, salary, name AS department FROM role LEFT JOIN department ON role.department_id = department.id')
    return result
}

const add = async () => {
    const departments = await departmentActions.view()
    const departmentChoices = departments.map(row => {return {
            name: row.name,
            value: row.id
        }
    })
    await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role\'s title?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the role\'s salary?',
            transformer: num => '$'+num
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What department does the role belong to?',
            choices: departmentChoices
        }
    ]).then(async responses => {
        const { title, salary, departmentId } = responses
        await db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
        [title, salary, departmentId])
        console.log(`${title} added to database`)
    })
}

module.exports = { view, add }