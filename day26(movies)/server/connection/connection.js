// var mysql = require('mysql');
import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;

// insert into movies_35 (id, name, Movie_Type, ratings, language) values
// (1,"Tiger", "Action, Drama",  7,  "Hindi");


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


// [
//   RowDataPacket {
//     id: 1,
//     name: 'Tiger',
//     Movie_Type: 'Action, Drama',
//     ratings: '7',
//     language: 'Hindi'
//   },
//   RowDataPacket {
//     id: 2,
//     name: 'Avatar',
//     Movie_Type: 'Science fiction',
//     ratings: '9',
//     language: 'English, Hindi'
//   },
//   RowDataPacket {
//     id: 4,
//     name: 'Chello divas',
//     Movie_Type: 'comedy',
//     ratings: '9',
//     language: 'Gujarati'
//   }
// ]
// [
//   RowDataPacket { name: 'Avatar' },
//   RowDataPacket { name: 'Chello divas' },
//   RowDataPacket { name: 'Tiger' }
// ]
// [
//   RowDataPacket {
//     id: 4,
//     name: 'Chello divas',
//     Movie_Type: 'comedy',
//     ratings: '9',
//     language: 'Gujarati'
//   }
// ]
// Table data deleted
// Table data deleted
// [
//   RowDataPacket {
//     id: 4,
//     name: 'Chello divas',
//     Movie_Type: 'comedy',
//     ratings: '9',
//     language: 'Gujarati'
//   }
// ]
