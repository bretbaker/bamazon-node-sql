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
let choiceArray;
let itemID;
let stockQuantity;
let newQuantity;
let purchaseQuantity;
let itemPrice;

// function start() prompts user which product they would like to buy and in what quantity, and updates the database accordingly
const start = () => {
  connection.query('SELECT * FROM products', (err, result) => {
    if (err) throw err;
    inquirer
    .prompt([
      {
        name: 'choice',
        type: 'list',
        choices: () => {
          choiceArray = [];
          for (let i = 0; i < result.length; i++) {
            choiceArray.push(result[i].item_id + ' ' + result[i].product_name);
          }
          return choiceArray;
        },
        message: 'Which item would you like to buy?'
      }
    ])
    .then(answer1 => {
      // console.log(answer1);
      answer1.choice = answer1.choice.split(' ');
      // console.log(answer1.choice);
      itemID = parseInt(answer1.choice[0]);
      // console.log(itemID);
      connection.query('SELECT stock_quantity FROM products WHERE item_id = ' + itemID, (err, result) => {
        if (err) throw err;
        stockQuantity = result[0].stock_quantity;
        // console.log(stockQuantity);
        inquirer
        .prompt([
          {
            name: 'quantity',
            type: 'input',
            message: 'How many units would you like to buy?',
            validate: (value) => {
              if (parseInt(value) <= stockQuantity) {
                return true;
              }
              console.log('\n\nInsufficient quantity! There are ' + stockQuantity + ' left in stock! Please try again!\n');
              return false;
            }
          }
        ])
        .then(answer2 => {
          // console.log(answer2);
          connection.query('SELECT price FROM products WHERE item_id = ' + itemID, (err, result) => {
            if (err) throw err;
            purchaseQuantity = parseInt(answer2.quantity);
            itemPrice = result[0].price;
            // console.log(purchaseQuantity);
            // console.log(itemPrice);
            // console.log((purchaseQuantity * itemPrice).toFixed(2));
            console.log('\nThe total cost of your order is $' + ((purchaseQuantity * itemPrice).toFixed(2)) + '.');
            newQuantity = (stockQuantity - purchaseQuantity);
            connection.query(
            'UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: itemID
              }
            ],
            (err) => {
              if (err) throw err;
              // console.log('\nThere are now ' + newQuantity + ' left in stock!\n');
              console.log('\nThank you for your business!\n')
              connection.end();
            });
          });
        });   
      });         
    });
  });
};

// utilize connection to database and run main function
connection.connect(err => {
  if (err) throw err;
  start();
});