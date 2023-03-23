import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;


// create table breadcrumb_35 (
  // id int auto_increment primary key,
  // child varchar(255),
  // parent int
  // );