CREATE TABLE FitnessClass (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INTERVAL,
    schedule VARCHAR(100),
    capacity INT
);