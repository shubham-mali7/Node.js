const fs = require('fs');

// Sync..
// fs.writeFileSync("./test.txt", "Hello Shubham Beta");

// Asynch..
// fs.writeFile("./test.txt", "Oye Hoyee", (err)=>{})

// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result)

// fs.readFile("./contact.txt", "utf-8", (err, res)=>{
//     if(err){
//         console.log("Error", err);
//     }else{
//         console.log(res);
//     }
// })

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString())
// fs.appendFileSync("./test.txt",`${Date.now()} Hello There\n` );

// fs.cpSync('./test.txt', 'copy.txt');
// fs.unlinkSync('./copy.txt');

const status = fs.statSync('./test.txt');
console.log(status);