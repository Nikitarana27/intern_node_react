import mysql from 'mysql';

var con = mysql.createConnection({
  host: "192.168.2.8",
  user: "trainee",
  password: "trainee@123",
  database: "traineedb"
});
export default con;


// create table customers_35 (
//     id int primary key auto_increment,
//     Firstname varchar(255),
//     Lastname varchar(255),
//     Email varchar(255),
//     passwords varchar(255),
//     Mobile varchar(255),
//     Dob varchar(255),
//     Address varchar(255),
//     Gender varchar(255)
// );
// insert into customers_35 (id,Firstname,Lastname,Email,passwords,Mobile,Dob,Address,Gender)
// values ("","nikita","rana","nikita@gmail.com","nikita","9876955678","27/05/2002","a-38 Gayatri nagar","female");

// create table Products_35 (
//     id int primary key auto_increment,
//     PName varchar(255),
//     Brand  varchar(255),
//     Price decimal(65,2),
//     Status varchar(255),
// );

// insert into Products_35 (id,PName,Brand,Price,Status_)
// values 
// ("","masala munch","kurkure","20","active"),
// ("","puffcorn","kurkure","20","active"),
// ("","tangles","kurkure","20","active"),
// ("","solid masti","kurkure","30","active"),
// ("","hide & seek milano","parle","60","active"),
// ("","parle-G","parle","10","active"),
// ("","cream and onion","lay's","10","active"),
// ("","classic salted","lay's","10","active"),
// ("","sundried chilli","lay's","10","active"),
// ("","ratlami sev","haldiram's","10","active"),
// ("","bhujia sev","haldiram's","10","active"),
// ("","aloo sev","haldiram's","10","active"),
// ("","cream and onion","balaji wafers","20","active"),
// ("","ratlami sev","balaji wafers","20","active"),
// ("","masala masti","balaji wafers","20","active");


// create table cust_Pro_35 (
//     id int primary key auto_increment,
//     customer_id int,
//     Product_id int
// );

// insert into cust_Pro_35 (id, customer_id, Product_id) values ("",)

// create table orders_cp_35 (
//     id int primary key auto_increment,
//     customer_id int,
//     product_id int ,
//     product_name varchar(255),
//     Product_price int,
//     product_quantity int,
//     order_id int
// );
// insert into cust_Pro_35 (id, customer_id, product_id, product_name, Product_price, product_quantity, order_id) 
// values ("",)

// insert into cust_Pro_35 (id,
//   customer_id,
//   product_id,
//   product_name,
//   Product_price,
//   product_quantity,
//   order_id) values ('',2,3,"hello",20,3,1);