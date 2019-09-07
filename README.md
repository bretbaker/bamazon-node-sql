# bamazon-node-sql
- Code Bootcamp HW Assignment #11
- A CLI app that takes input from different user types and produces relevant output
- This app utilizes dotenv, inquirer, and mysql node packages
- Below are gifs demonstrating how this app works

Challenge #1: Customer View (Minimum Requirement)
- First I created a database called 'bamazon' and a table called 'products' (you can see this code in the .sql files) and populated this table with 10 products
- The first app 'bamazonCustomer' does two things: 1) asks the user which item they would like to buy 2) and asks for the quantity they would like to buy
- If the user tries to buy more units than are available, the transaction is prevented and the customer is advised how many units are in stock
- If the quantity requested is acceptable, the user is shown the total cost of their purchase and the database updates accordingly
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-1.gif)

Challenge #2: Manager View (Next Level)
- In this challenge the app 'bamazonManager' gives four options to the user and completes each process accordingly
- The first option is 'View Products for Sale' which displays all items available for sale in the 'products table'
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-2.gif)
- The second option 'View Low Inventory' displays any products that have less than five units in stock
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-3.gif)
- If there are no products low in inventory a message is displayed that advises same
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-4.gif)
- The third option is 'Add to Inventory' 
- This option asks which product you would like to add inventory to, displays how many units are currently in stock, and advises when the inventory has been updated, providing the new amount in stock
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-5.gif)
- The fourth and final option for this app, 'Add New Product' allows the user to add a completely new product to the table
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-6.gif)

Challenge #3: Supervisor View (Final Level)
- In this challenge I created a new table called 'departments'
- This app allows the user to do two things: 1) View Product Sales by Department, 2) Create New Department
- 'View Product Sales by Department' joins the two tables on 'department_name', calculates 'total_profit' and produces the data for viewing
* I would have liked to utilize the 'table' node package for aesthetic display but I ran out of time for this assignment
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-7.gif)
- 'Create New Department' prompts for the appropriate information and updates the databse accordingly
![](https://github.com/bretbaker808/bamazon-node-sql/blob/master/gifs/gif-8.gif)






