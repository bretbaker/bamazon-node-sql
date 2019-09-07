# bamazon-node-sql
- Code Bootcamp HW Assignment #11
- A CLI app that takes input from different user types and produces relevant output
- This app utilizes dotenv, inquirer, and mysql node packages
- Below are gifs demonstrating how this app works

Challenge #1: Customer View (Minimum Requirement)
- First we created a database called 'bamazon' and a table called 'products' (you can see this code in the .sql files) and populated thistable with 10 products
- The first app 'bamazonCustomer' does two things: ask the user which item they would like to buy and what quantity of this item they would like to buy
- If the user tries to buy more units than are available, the app advises them how many units are in stock
- The app tells the user the total cost of their purchase and updates the database upon transaction completion
![](https://github.com/bretbaker808/bamazon-nde-sql/blob/master/gifs/gif1.gif)
