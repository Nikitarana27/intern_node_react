import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;


// create table User_Management_35(
//   id bigint(20) auto_increment primary key,
//   code char(6),
//   firstname varchar(100),
//   lastname varchar(100),
//   email varchar(255),
//   gender char(1),
//   hobby varchar(255),
//   filename varchar(100),
//   country varchar(30),
//   state char(1),
//   dateadded varchar(255),
//   dateupdated varchar(255),
//   endeffdt varchar(255)
// );