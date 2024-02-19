CREATE TABLE Member (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_details VARCHAR(100),
    member_status VARCHAR(20)
);