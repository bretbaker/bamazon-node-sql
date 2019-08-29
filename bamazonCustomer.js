// require dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'bamazon'
});

// utilize connection to database
connection.connect(err => {
    if (err) throw err;
    start();
});

// prompt user which product they would like to buy and in what quantity
const start = () => {
    connection.query('SELECT * FROM products', (err, result) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < result.length; i++) {
                        choiceArray.push(result[i].item_id + ' ' + result[i].product_name);
                    }
                    return choiceArray;
                },
                message: 'Which item would you like to buy?'
            },
            {
                name: 'quantity',
                type: 'number',
                message: 'How many units would you like to buy?'
            }
        ])
        .then(answer => {
            console.log(answer);
        });
    });
};