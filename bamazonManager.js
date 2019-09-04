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
let lowInventory;
let itemArray = [];
let itemID;
let newInventory;
let priceFormat;
let typeCheck;

// function start() runs four different queries on the database
const start = () => {
    connection.query('SELECT * FROM products', (err, result) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'list',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
                message: 'Select Action:'
            }
        ])
        .then(answer => {
            // console.log(answer.choice);
            // connection.end();
            if (answer.choice === 'View Products for Sale') {
                connection.query('SELECT * FROM products', (err, result) => {
                    if (err) throw err;
                    console.log('---------------------------------------------------');
                    for (let i = 0; i < result.length; i++) {
                        console.log('Item ID: ' + result[i].item_id);
                        console.log('Product Name: ' + result[i].product_name);
                        console.log('Department: ' + result[i].department_name);
                        console.log('Price: $' + result[i].price);
                        console.log('Stock Quantity: ' + result[i].stock_quantity);
                        console.log('---------------------------------------------------');
                    };
                    connection.end();
                });
            };
            if (answer.choice === 'View Low Inventory') {
                connection.query('SELECT * FROM products', (err, result) => {
                    if (err) throw err;
                    lowInventory = false;
                    // console.log(answer.choice);
                    // connection.end();
                    console.log('---------------------------------------------------');
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].stock_quantity < 5) {
                            lowInventory = true;
                            console.log('THIS ITEM IS LOW IN INVENTORY');
                            console.log('Item ID: ' + result[i].item_id);
                            console.log('Product Name: ' + result[i].product_name);
                            console.log('Department: ' + result[i].department_name);
                            console.log('Price: $' + result[i].price);
                            console.log('Stock Quantity: ' + result[i].stock_quantity);
                            console.log('---------------------------------------------------');
                        };
                    };
                    if (lowInventory === false) {
                        console.log('\nThere are no items currently low in inventory!\n');
                        console.log('---------------------------------------------------');
                        connection.end();
                    } else {
                        connection.end();
                    };
                });
            };
            if (answer.choice === 'Add to Inventory') {
                connection.query('SELECT * FROM products', (err, result) => {
                    if (err) throw err;
                    // console.log(result);
                    // connection.end();
                    inquirer
                    .prompt([
                        {
                            name: 'item',
                            type: 'list',
                            choices: () => {
                                for (let i = 0; i < result.length; i++) {
                                    itemArray.push(result[i].item_id + ' ' + result[i].product_name);
                                }
                                return itemArray;
                            },
                            message: 'For which item would you like to add inventory?'
                        }
                    ])
                    .then(answer2 => {
                        answer2.item = answer2.item.split(' ');
                        itemID = parseInt(answer2.item[0]);
                        connection.query('SELECT stock_quantity FROM products WHERE item_id = ' + itemID, (err,result) => {
                            if (err) throw err;
                            console.log('---------------------------------------------------');
                            console.log('\nThe item you selected currently has ' + result[0].stock_quantity + ' units in stock.\n');
                            console.log('---------------------------------------------------');
                            inquirer
                            .prompt([
                                {
                                    name: 'units',
                                    type: 'input',
                                    validate: (value) => {
                                        if (parseInt(value) === NaN) {
                                            console.log('Please enter number values only!');
                                            return false;
                                        }
                                        return true;
                                    },
                                    message: 'How many units would you like to add to inventory?'
                                }
                            ])
                            .then(answer3 => {
                                newInventory = parseInt(result[0].stock_quantity) + parseInt(answer3.units);
                                // console.log(answer3.units + ' units will be added to the current inventory of ' + result[0].stock_quantity + ' for a new inventory total of ' + newInventory);
                                connection.query(
                                    'UPDATE products SET ? WHERE ?',
                                    [
                                        {
                                            stock_quantity: newInventory
                                        },
                                        {
                                            item_id: itemID
                                        }
                                    ],
                                    (err) => {
                                        if (err) throw err;
                                        console.log('---------------------------------------------------');
                                        console.log('\nInventory updated!\n');
                                        console.log('The new amount in inventory is ' + newInventory + '.');
                                        console.log('\n---------------------------------------------------');
                                        connection.end();
                                    }
                                );
                            });
                        });
                    });
                });
            };
            if (answer.choice === 'Add New Product') {
                console.log('Follow prompts below to add new product:');
                inquirer
                .prompt([
                    {
                        name: 'product_name',
                        type: 'input',
                        message: 'Please enter product name: ',
                        validate: (value) => {
                            // typeCheck = 
                            if (typeof value !== 'string') {
                                console.log('Please enter a valid product name.');
                                return false;
                            }
                            return true;
                        }
                    },
                    {
                        name: 'department_name',
                        type: 'input',
                        message: 'Please enter department name: ',
                        validate: (value) => {
                            if (typeof value !== 'string') {
                                console.log('Please enter a valid department name.');
                                return false;
                            }
                            return true;
                        }
                    },
                    {
                        name: 'price',
                        type: 'input',
                        message: 'Please enter price value: ',
                        validate: (value) => {
                            if (typeof value === NaN) {
                                console.log('Please enter a valid price value.');
                                return false;
                            }
                            return true;
                        }
                    },
                    {
                        name: 'stock_quantity',
                        type: 'input',
                        message: 'Please enter inventory amount: ',
                        validate: (value) => {
                            if (typeof value === NaN) {
                                console.log('Please enter a valid inventory amount.');
                                return false;
                            }
                            return true;
                        }
                    }
                ])
                .then(answer4 => {
                    console.log(parseFloat(answer4.price));
                    console.log(parseFloat(answer4.price.toFixed(2)));
                    // priceFormat = answer4.price.toFixed(2);

                    // connection.query(
                    //     'INSERT INTO products SET ?',
                    //     {
                    //         product_name: answer4.product_name,
                    //         department_name: answer4.department_name,
                    //         price: priceFormat,
                    //         stock_quantity: answer4.stock_quantity
                    //     },
                    //     (err) => {
                    //         if (err) throw err;
                    //         console.log('---------------------------------------------------');
                    //         console.log('\nNew product added!\n');
                    //         console.log('---------------------------------------------------');
                    //         connection.end();
                    //     }
                    // );
                });
            };
        });
    });
};

// utilize connection to database and run main function
connection.connect(err => {
    if (err) throw err;
    start();
});