// var mysql = require('mysql');
import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// //   name,genre(Horror,thriller,Science Fiction,Drama,Comedy,Art etc.,),rating (out of 10),language
//   var sql = "CREATE TABLE movies_35 (id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), type VARCHAR(255) , ratings VARCHAR(255), language VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });



// /CREATE TABLE movies_35 (id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), type VARCHAR(255) , ratings VARCHAR(255), language VARCHAR(255))
