inquirer = require('inquirer')
const db = require('../config/connection')

const view = async () => {
    const [result, data] = await db.query('SELECT * FROM department')
    return result
}

const add = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the department\'s name?'
        }
    ]).then(async responses => {
        const { name } = responses
        await db.query('INSERT INTO department (name) VALUES (?)',
        name)
        console.log(`${name} added to database`)
    })
}

module.exports = { view, add }