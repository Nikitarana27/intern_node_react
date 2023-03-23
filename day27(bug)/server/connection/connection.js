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
// )\


// insert into bugs_35 (Title, Description, Time_, Date_, Assignee)
// values ("dnj","idjAJc",curtime(),curdate() ,"dhvbisac");


// delete from bugs_35 where id BETWEEN 27 AND 52;
// SELECT * FROM bugs_35;