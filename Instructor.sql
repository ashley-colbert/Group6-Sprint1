CREATE TABLE Instructor (
    instructor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(100),
    availability VARCHAR(100)
);