import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;


// create table tokens_35 (
//     First_name varchar(255),
//     Last_name varchar(255),
//     Email varchar(255) unique,
//     Password_ varchar(255),
//     Token varchar(255));

// insert into tokens_35 (First_name,Last_name,Email,Password_,Token) values ("nikita","rana","rnikita@gmail.com","nikita","");

// select * from tokens_35;

// UPDATE tokens_35 SET Token = ${token} WHERE Email = "${Email}" ;

// ALTER TABLE tokens_35
// ADD id int unique auto_increment;