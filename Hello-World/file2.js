// aim:- To understand difference between blocking and non blocking operations  

const fs = require("fs");
const os = require('os');

// Blocking...
// console.log("1");
// const result = fs.readFileSync('./contact.txt', 'utf-8');

// console.log(result);
// console.log("2");

// Non Blocking...
// console.log("1");
// fs.readFile('./contact.txt', 'utf-8', (err, res)=>{
//     console.log(res);
// });
// console.log("2");

console.log(os.cpus().length)