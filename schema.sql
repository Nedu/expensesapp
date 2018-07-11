CREATE TABLE expenses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    transaction_date date NOT NULL,
    amount float NOT NULL,
    VAT float NOT NULL, 
    reason VARCHAR(255) NOT NULL
);

-- Initial insert before VAT
-- INSERT INTO expenses (transaction_date, amount, reason)
-- VALUES ('2018-02-13', 35.50, 'Grocery Shopping' ),
--     ('2018-03-19', 55.50, 'Insurance' ),
--     ('2018-04-29', 20.50, 'Movies' ),
--     ('2018-05-25', 135.50, 'Car Mortgage' ),
--     ('2018-06-03', 15.50, 'Rent' );