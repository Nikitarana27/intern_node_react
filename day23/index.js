
//----------------------------------------
//express
//----------------------------------------

// const express = require('express');

// const app = express();


// app.get("/", (req , resp) =>{
//     resp.send("app is working...")
// });
// app.listen(3000);

//----------------------------------------
//hello world program 
//----------------------------------------

// var http = require('http');
// http.createServer(function (req, res) {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.write('Hello World!');
    //   res.end();
    // }).listen(8080);
    
    
//----------------------------------------
//myfirstmodule http
//----------------------------------------
// var http = require('http');
// var dt = require('./myfirstmodule');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write("The date and time are currently: " + dt.myDateTime());
//   res.end();
// }).listen(8080);


//----------------------------------------
//demo_http_url
//----------------------------------------
// var http = require('http');
// http.createServer(function (req, res) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(req.url);
//       res.end();
//     }).listen(8080);
    
    
//----------------------------------------
// url parse
//----------------------------------------
// var http = require('http');
// var url = require('url');

// http.createServer(function (req, res) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       var q = url.parse(req.url, true).query;
//       var txt = q.year + " " + q.month;
//       res.end(txt);
//     }).listen(3000);
    
    
    
//----------------------------------------
//files
//----------------------------------------


// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//   fs.readFile('./demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
    
// });

// }).listen(3000);
// Read files
// Create files
// Update files
// Delete files
// Rename files

// fs.appendFile() method appends specified content to a file
// fs.open()  method takes a "flag" as the second argument
// fs.writeFile()  fs.writeFile() method replaces the specified file and content if it exists. 
// fs.unlink() method deletes the specified file:
//fs.rename() method renames the specified file:

// -------------------------------
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req,resp){
    // fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    //   if (err) throw err;
    //   console.log('Saved!');
    // });

    // fs.readFile('./mynewfile1.txt', function(err, data) {
    //         resp.writeHead(200, {'Content-Type': 'text'});
    //         resp.write(data);
    //         return resp.end();
            
    //     });

    // fs.unlink('mynewfile1.txt', function (err) {
    //     if (err) throw err;
    //     console.log('File deleted!');
    //   });


    // fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
    //     if (err) throw err;
    //     console.log('File Renamed!');
    //   });
    //   fs.readFile('./myrenamedfile.txt', function(err, data) {
    //         resp.writeHead(200, {'Content-Type': 'text'});
    //         resp.write(data);
    //         return resp.end();
            
    //     });

// }).listen(3000);

//----------------------------------------
//----------------------------------------


//----------------------------------------
// URLs
//----------------------------------------
// var url = require('url');
// var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
// var q = url.parse(adr, true);

// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'

// var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
// console.log(qdata.month); //returns 'february'


//----------------------------------------
// URLs with http with files
//----------------------------------------
// var http = require('http');
// var url = require('url');
// var fs = require('fs');

// http.createServer(function (req, res) {
//   var q = url.parse(req.url, true);
//   console.log(q);
//   var filename = "." + q.pathname + ".html";
//   console.log(filename);
//   fs.readFile(filename, function(err, data) {
//     if (err) {
//       res.writeHead(404, {'Content-Type': 'text/html'});
//       return res.end("404 Not Found");
//     } 
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(3000);


//----------------------------------------
// var uc = require('upper-case'); for uupercase 
//----------------------------------------
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// //Create an event handler:
// var myEventHandler = function () {
//   console.log('I hear a scream!');
// }

// //Assign the event handler to an event:
// eventEmitter.on('scream', myEventHandler);

// //Fire the 'scream' event:
// eventEmitter.emit('scream');


//--------------------------------------------
// buffer file
//--------------------------------------------
var fs = require("fs");
var buf = new Buffer(1024);
 
console.log("opening an existing file");
fs.open('myrenamedfile.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("reading the file");
    
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");
       
      // Print only read bytes to avoid junk.
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});