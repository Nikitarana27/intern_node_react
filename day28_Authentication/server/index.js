import express, { response } from 'express';
import cors from 'cors';
import con from './connection/connection.js';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import Secret from './secretkey/Secret.js';

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;

con.connect(() => {
    console.log("connected");
})

app.get("/", (req, res) => {
    res.send("hello");
})



app.post("/Register", (req, res) => {
    const FirstName = req.body.fname;
    const LastName = req.body.lname;
    const Email = req.body.email;
    const Password = req.body.password;
    const sql = `insert into tokens_35 (First_name,Last_name,Email,Password_,Token,id,Date_) values ("${FirstName}","${LastName}","${Email}","${Password}","",'',curdate()); `
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("data inserted");
    });

});

app.post("/login", (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;
    var token = jwt.sign({ email: Email }, Secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    //   console.log(token);
    const sql1 = `select * from tokens_35 where Email = "${Email}";`
    con.query(sql1, function (err, result) {
        // if (err) throw err;
        if (result[0] === undefined) {
            res.send("invalid email.. please register yourself first")
        }
        else {
            // console.log(result[0].Email);
            if (result[0].Password_ === Password) {
                const sql = `UPDATE tokens_35 SET Token = "${token}" WHERE Email = "${Email}" ;`
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
})

app.post("/getdata", (req, res) => {
    const email = req.body.Email;
    console.log(email);

})

app.get('/profile', function (req, res) {
    // console.log("hello")
    const token = req.headers["tkn"];
    // console.log(token);
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, Secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        con.query(`select * from tokens_35 where Token = "${token}" and Email="${decoded.email}";`, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
        });
        //   res.status(200).send(decoded);
    });
});

app.get("*", (req, res) => {
    res.send("invalid route");
})

app.listen(PORT, () => {
    console.log(`listenning on port ${PORT}`)
});