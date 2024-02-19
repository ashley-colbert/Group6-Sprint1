CREATE TABLE RewardsProgram (
    reward_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    reward_description TEXT,
    reward_amount DECIMAL(10, 2),
    reward_date DATE
);