import con from '../connection/connection.js';
import jwt from 'jsonwebtoken';
import Secret from '../connection/Secret.js';

 export const GetProducts = (req,res) =>{
    const sql ='select id, PName, Brand, concat(price,"/-") as Price, Status_ from Products_35;'
    con.query(sql , function(err,result){
        if(err) throw err;
        res.send(result);
    })
 }

 export const customer_product = (req,res) =>{
    const token = req.body.headers['tkn'];
    // console.log(token);
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, Secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // console.log(decoded)
        con.query(`select id from customers_35 where Email = "${decoded.Email}"`,function(err,result){
            // console.log(result[0].id);
            if(err) throw err ;
            const id = result[0].id;
            // console.log(id);
            con.query(`select quantity as count from cust_Pro_35 where customer_id = ${id} and Product_id = ${req.body.Id};`,function(err,result){
                if(err) throw err ;
                // console.log(result);
                // let counts = result[0].count;
                if(result == ""){
                    con.query(`insert into cust_Pro_35 (id, customer_id, Product_id,quantity) values ("",${id},${req.body.Id},1)`,function(err,result){
                        if(err) throw err ;
                    })
                }
                else{
                    con.query(`update cust_Pro_35 set quantity = ${result[0].count}+1 where customer_id = ${id} and Product_id = ${req.body.Id}`,function(err,result){
                        if(err) throw err ;
                    })
                }
            });
        });
    });
 }




