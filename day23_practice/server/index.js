const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const url = require('url');
const fs = require('fs');
const http = require('http');

// app.get("/api",function(req,res){
//   const q = url.parse(req.url,true);
//   // console.log(q);
//     var qdata = q.query
//     console.log(qdata.snumber);

// })
app.get("/",(req,res)=>{
  res.send("hello");
})
http.createServer(function (req, res) {
  fs.readFile("prime.html", function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
  
})

// console.log(q.query);
// console.log(qdata)
app.get("/:id",function(req,res){
  
  const q = url.parse(req.url, true);
  console.log(q);

  
});


  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });





  // if (fnumber != null && snumber != null) {
  //   for (var i = fnumber; i <= snumber; i++) {


  //     // take input from the user
  //     const i = parseInt(prompt("Enter a positive number: "));
  //     let isPrime = true;

  //     // check if number is equal to 1
  //     if (i === 1) {
  //       console.log("1 is neither prime nor composite number.");
  //     }

  //     // check if number is greater than 1
  //     else if (i > 1) {

  //       // looping through 2 to number-1
  //       for (let i = 2; i < i; i++) {
  //         if (i % i == 0) {
  //           isPrime = false;
  //           break;
  //         }
  //       }

  //       if (isPrime) {
  //         res.write(`${i} is a prime number`);
  //       } else {
  //         res.write(`${i} is a not prime number`);
  //       }
  //     }

  //     // check if number is less than 1
  //     else {
  //       res.write("The number is not a prime number.");
  //     }
  //   }
  // }
  // else {
  //   res.write("fill data");
  // }
