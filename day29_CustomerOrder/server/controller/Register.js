// import mysql from 'mysql';
import con from '../connection/connection.js';
import jwt from 'jsonwebtoken';
import Secret from '../connection/Secret.js';

export const createEmployee = (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const pwd = req.body.pwd;
    const mobile = req.body.mobile;
    const date = req.body.date;
    const address = req.body.address;
    const gender = req.body.gender;
    // con.query(`select Email from customers_35;`, function (err, result) {
    //     // if (err) throw err;
    //         for (let i = 0; i < result.length; i++) {
    //             if (result[i].Email === email) {
    //                 res.send("email alreasy exist");
    //             }
    const sql1 = `select * from customers_35 where Email = "${email}";`
    con.query(sql1, function (err, result) {
        // if (err) throw err;
        if (result[0] === undefined) {
            const sql = `insert into customers_35 (id,Firstname,Lastname,Email,passwords,Mobile,Dob,Address,Gender) values ("","${fname}","${lname}","${email}","${pwd}","${mobile}","${date}","${address}","${gender}");`
            con.query(sql, function (err, result) {
                if (err) throw err;

                res.send("customer added successfully");
            })
        }
        else {
            res.send("email alreasy exist.. enter another email")
        }

    })


    // const sql = `insert into customers_35 (id,Firstname,Lastname,Email,passwords,Mobile,Dob,Address,Gender) values ("","${fname}","${lname}","${email}","${pwd}","${mobile}","${date}","${address}","${gender}");`
    //                 con.query(sql, function (err, result) {
    //                     if (err) throw err;

    //                  res.send("customer added successfully");
    //                 })
}

export const createtoken = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    var token = jwt.sign({ Email: email }, Secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    const sql1 = `select * from customers_35 where Email = "${email}";`
    con.query(sql1, function (err, result) {
        // if (err) throw err;
        if (result[0] === undefined) {
            res.send("invalid email.. please register yourself first")
        }
        else {
            // console.log(result[0].Email);
            if (result[0].passwords === password) {
                const sql = `UPDATE customers_35 SET access_token = "${token}" WHERE Email = "${email}" ;`
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    res.send(token);
                });
            }
            else (
                res.send("password invalid")
            )
        }

    });
}


export const Profile = (req, res) => {
    const token = req.headers["tkn"];
    // console.log(token);
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, Secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // console.log(decoded);
        con.query(`select * from customers_35 where access_token = "${token}" and Email="${decoded.Email}";`, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
        //   res.status(200).send(decoded);
    });
}



export const Edit = (req, res) => {
    // console.log(req.body);
    const {firstname,Lastname,Email,Password,Mobile,DOB,Address,Gender} = req.body;
    // console.log(firstname,Lastname,Email,Password,Mobile,DOB,Address,Gender);
   const sql = `update customers_35 set Firstname = "${firstname}",Lastname  = "${Lastname}",passwords = "${Password}" ,Mobile = "${Mobile}" ,Dob = "${DOB}",Address = "${Address}",Gender = "${Gender}" where  Email = "${Email}"`
   con.query(sql,function (err, result){
    if(err) throw err;
    res.send("updated");
   })
    
}

// update customers_35 set firstname = "subham",Lastname = "talati",passwords = "123456",Mobile = "9876543219",DOB = "2023-03-30", Address = "vadodara",Gender = "female" where Email = "talati@gmail.com";