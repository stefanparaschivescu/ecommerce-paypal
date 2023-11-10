INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price, paypal_order_id, paypal_url, is_paid)
    VALUES (1, 'Wall Street1', 'New York', '2021-04-07', 'test123@test.com', 'John', 'Doe', '1234567890', 1234567890, 840, 'PAYPAL123', 'PAYPAL_URL', true);
INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price, paypal_order_id, paypal_url, is_paid)
    VALUES (2, 'Wall Street1', 'New York', '2021-04-07', 'test123@test.com', 'John', 'Doe', '1234567890', 1234567890, 240, 'PAYPAL123', 'PAYPAL_URL', true);
INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price, paypal_order_id, paypal_url, is_paid)
    VALUES (3, 'Tverskaya street 1', 'Moscow', '2021-04-07', 'ivan123@test.com', 'Ivan', 'Ivanov', '1234567890', 1234567890, 163, 'PAYPAL123', 'PAYPAL_URL', true);
INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price, paypal_order_id, paypal_url, is_paid)
    VALUES (4, 'Tverskaya street 1', 'Moscow', '2021-04-07', 'ivan123@test.com', 'Ivan', 'Ivanov', '1234567890', 1234567890, 780, 'PAYPAL123', 'PAYPAL_URL', true);
INSERT INTO orders (id, address, city, date, email, first_name, last_name, phone_number, post_index, total_price, paypal_order_id, paypal_url, is_paid)
    VALUES (5, 'Tverskaya street 1', 'Moscow', '2021-04-07', 'ivan123@test.com', 'Ivan', 'Ivanov', '1234567890', 1234567890, 196, 'PAYPAL123', 'PAYPAL_URL', true);

INSERT INTO order_item (id, amount, quantity, product_id) VALUES (1, 384, 2, 1);
INSERT INTO order_item (id, amount, quantity, product_id) VALUES (2, 456, 3, 2);
INSERT INTO order_item (id, amount, quantity, product_id) VALUES (3, 178, 2, 3);

INSERT INTO orders_order_items (order_id, order_items_id) VALUES (1, 1);
INSERT INTO orders_order_items (order_id, order_items_id) VALUES (2, 2);
INSERT INTO orders_order_items (order_id, order_items_id) VALUES (3, 3);


