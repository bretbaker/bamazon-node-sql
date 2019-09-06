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

// start() variables

// function start() runs query on the database depending on user's choice (2 options)
const start = () => {
  inquirer.prompt([
    {
      name: 'choice',
      type: 'list',
      choices: ['View Product Sales by Department', 'Create New Department'],
      message: 'Select Action:'
    }
  ]).then(answer => {
    // console.log(answer);
    // connection.end();
    if (answer.choice === 'View Product Sales by Department') {
      connection.query('SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - over_head_costs AS total_profit FROM departments JOIN products ON departments.department_name = products.department_name GROUP BY department_name', (err, result) => {
        if (err) throw err;
        // console.log(result);
        console.log('-----------------------------------------------------------------------------------');
        for (let i = 0; i < result.length; i++) {
        console.log('Department ID: ' + result[i].department_id);
        console.log('Department Name: ' + result[i].department_name);
        console.log('Overhead Costs: $' + result[i].over_head_costs);
        console.log('Product Sales: $' + result[i].product_sales);
        console.log('Total Profit: $' + result[i].total_profit);
        console.log('-----------------------------------------------------------------------------------');
        }
        connection.end();
      });
    };
    if (answer.choice === 'Create New Department') {
      inquirer.prompt([
        {
          name: 'department_name',
          type: 'input',
          message: 'Please enter department name:',
          validate: (value) => {
            if (isNaN(value) === false) {
              return false;
            }
            return true;
          }
        },
        {
          name: 'over_head_costs',
          type: 'input',
          message: 'Please enter overhead costs value:',
          validate: (value) => {
            if (isNaN(value) === true) {
              return false;
            }
            return true;
          }
        }
      ]).then(answer2 => {
        connection.query(
          'INSERT INTO departments SET ?',
          {
            department_name: answer2.department_name,
            over_head_costs: answer2.over_head_costs
          },
          (err) => {
            if (err) throw err;
            console.log('---------------------------------------------------');
            console.log('\nNew department added!\n');
            console.log('---------------------------------------------------');
            connection.end();
          }
        );
      });
    };
  });
};

// utilize connection to database and run main function
connection.connect(err => {
  if (err) throw err;
  start();
});