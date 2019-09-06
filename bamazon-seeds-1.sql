USE bamazon;

INSERT INTO	departments (department_name, over_head_costs)
VALUES ('clothing', 60000);

INSERT INTO	departments (department_name, over_head_costs)
VALUES ('electronics', 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('t-shirt', 'clothing', 24.99, 1200, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('shorts', 'clothing', 19.99, 1000, 50000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('jeans', 'clothing', 34.99, 800, 40000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('hat', 'clothing', 14.99, 1500, 20000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('tank-top', 'clothing', 16.99, 1800, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('television', 'electronics', 449.99, 2000, 8000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('desktop-computer', 'electronics', 699.99, 1750, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('laptop-computer', 'electronics', 1299.99, 950, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('mobile-phone', 'electronics', 849.99, 800, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('headphones', 'electronics', 74.99, 5000, 3000);

SELECT * FROM departments;

SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - over_head_costs AS total_profit
FROM departments
JOIN products ON departments.department_name = products.department_name
GROUP BY department_name;