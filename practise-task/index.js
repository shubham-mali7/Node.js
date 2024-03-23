// Question: Write a Node.js program that reads a JSON file containing information about employees, where each employee has a name and a salary. The program should calculate the total salary of all employees and print it to the console.

const fs = require("fs");

// Read the JSON file
fs.readFile("./data.json", "utf-8", (err, jsonString) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  // Parse JSON string
  try {
    const data = JSON.parse(jsonString);
    const totalSalary = data[0].salary + data[1].salary + data[2].salary;
    console.log(`total Salary of all employees is:${totalSalary}`);
  } catch (err) {
    console.log("Invalid JSON String", err);
  }
});
