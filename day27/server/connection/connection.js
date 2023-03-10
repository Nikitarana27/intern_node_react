import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;

//CREATE TABLE bugs_35 (
//     id int primary key AUTO_INCREMENT,
//     Title varchar(255),
//     Description varchar(255),
//     Time_ varchar(255),
//     Date_ varchar(255),
//     Assignee varchar(255)
// )