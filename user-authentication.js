#!/usr/bin env node

const fs = require('fs');
const bcrypt = require('bcrypt');

const usersFilePath = './users.json';

// Read existing users from the JSON file.

function readUsers() {
    try {
        const rawData = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        return [];
    }
}

// Write updated users to the JSON file.

function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

// Add a new user.

function addUser(username, password) {
    const users = readUsers();
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    writeUsers(users);
    console.log(`User "${username}" added successfully!`);
}

// Example usage
const [username, password] = process.argv;
if (username && password) {
    addUser(username, password);
} else {
    console.error('Usage: user-auth <username <password>');
}

module.exports = {
    readUsers,
    writeUsers,
    addUser,
}