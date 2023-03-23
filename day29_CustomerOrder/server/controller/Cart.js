import con from '../connection/connection.js';
import jwt from 'jsonwebtoken';
import Secret from '../connection/Secret.js';


export const getMyCart = (req,res) => {
    const token = req.headers['tkn'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, Secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        con.query(`select id from customers_35 where Email = "${decoded.Email}"`,function(err,result){
            if(err) throw err ;

            con.query(`select c.id as id,p.Pname as pname,p.Brand as brand,p.Price as Price,c.quantity as quantity,c.customer_id as cid,c.Product_id as pid from cust_Pro_35 c
            inner join Products_35 p on c.Product_id=p.id
            where customer_id = ${result[0].id};`,function(err,result){
                if(err) throw err ;

                res.send(result);
            })
        })
    });
}


export const handleQuantityAdd = (req,res) => {
    const quantity = req.body.Quantity;
    const pid = req.body.Pid;
    const cid = req.body.Cid;
    con.query(`update cust_Pro_35 set quantity = ${quantity}+1 where customer_id = ${cid} and Product_id = ${pid}`,function(err,result){
        if(err) throw err;
    })
}

export const handleQuantitySubtract = (req,res) => {
    const quantity = req.body.Quantity;
    const pid = req.body.Pid;
    const cid = req.body.Cid;
    if(quantity == 1){
        con.query(`delete from cust_Pro_35 where customer_id = ${cid} and Product_id = ${pid}`,function(err,result){
                if(err) throw err;
            })
    }
    else{
        con.query(`update cust_Pro_35 set quantity = ${quantity}-1 where customer_id = ${cid} and Product_id = ${pid}`,function(err,result){
            if(err) throw err;
        })
    }
}

export const handleRemove = (req,res) =>{
    const id = req.body.Id;
    con.query(`delete from cust_Pro_35 where id = ${id};`,function(err,result){
        if(err) throw err;
    })
}