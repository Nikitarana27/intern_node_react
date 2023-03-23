import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;





//create table emp_35 (
//  id int primary key auto_increment,
//  Firstname varchar(255),
//  Lastname varchar(255),
//  contact int ,
// address varchar(255),
// work_location varchar(255)
//  );

// select * from emp_35;



// create table hr_data_35 (
//     id int primary key auto_increment,
//     payroll decimal(65,2),
//     social_security_number varchar(255),
//     emp_id int ,
//    salary decimal(65,2)
//     );
   
//    select * from hr_data_35;




// create table Locations_Table_35 (
//     building_id varchar(255),
//     address varchar(255),
//     zip int,
//     manager_name varchar(255));

//     select * from Locations_Table_35;
