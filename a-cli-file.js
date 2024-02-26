#!/usr/bin/env node

const fs = require('fs');

// Read a JSON file.

function readJsonFile(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error('Error reading JSON file:', err.message);
        return null;
    }
}

// Write data to a JSON file.

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Data written to JSON file successfully!');
    } catch (err) {
        console.error('Error writing JSON file:', err.message);
    }
}

// Read a text file.

function readTextFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading text file:', err.message);
        return null;
    }
}

// Write data to a text file

function writeTextFile(filePath, text) {
    try {
        fs.writeFileSync(filePath, text, 'utf8');
        console.log('Text written to file successfully!');
    } catch (err) {
        console.error('Error writing text file:', err.message);
    }
}

// Example usage
const jsonFilePath = './data.json';
const textFilePath = './notes.txt';

const jsonData = readJsonFile(jsonFilePath);
if (jsonData) {
    jsonData.updatedAt = new Date().toISOString();
    writeJsonFile(jsonFilePath, jsonData);
}

const textData = readTextFile(textFilePath);
if (textData) {
    const newText = textData + '\nAdded a new line!';
    writeTextFile(textFilePath, newText);
}

module.exports = {
    readJsonFile,
    writeJsonFile,
    readTextFile,
    writeTextFile
}