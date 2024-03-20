
-- Create a table to store menu items
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
 

SELECT * FROM menu_items; -- retrieve all menu items

SELECT * FROM menu_items WHERE id = 1; -- replace 1 with the specific item id you want to retrieve

INSERT INTO menu_items (name, price, description) VALUES ('Burger', 10.99, 'A delicious burger with cheese and bacon');

UPDATE menu_items SET price = 12.99 WHERE id = 1; -- replace 1 with the specific item id you want to update

DELETE FROM menu_items WHERE id = 1; -- replace 1 with the specific item id you want to delete
```

