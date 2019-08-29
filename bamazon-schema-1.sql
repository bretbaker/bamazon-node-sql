DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

