import con from '../connection/connection.js';
import jwt from 'jsonwebtoken';
import Secret from '../connection/Secret.js';


export const handleOrderSubmit = (req,res) => {
    con.query("select max(order_id) as count from orders_cp_35;" , function(err,result){
        let counter = result[0].count + 1;
        // console.log(result[0].count);
        // console.log(req.body.datas[0].cid);
        for (let i = 0 ; i < req.body.datas.length ; i++){
            con.query(`insert into orders_cp_35 (id, customer_id, product_id, pname, Product_price, product_quantity, order_id , Data_of_order) values ('',${req.body.datas[i].cid},${req.body.datas[i].pid},"${req.body.datas[i].pname}",${req.body.datas[i].Price},${req.body.datas[i].quantity},${counter},curdate())`,function(err,result){
                if(err) throw err;
            })
            con.query(`delete from cust_Pro_35 where customer_id = ${req.body.datas[i].cid} and product_id = ${req.body.datas[i].pid};`,function(err,result){
            })
        }
    })
}


export const getOrders = (req,res) =>{
    const token = req.headers['tkn'];
    // console.log(token);
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, Secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // console.log(decoded)
        con.query(`select id from customers_35 where Email = "${decoded.Email}"`,function(err,result){
            // console.log(result[0].id);
            if(err) throw err ;

            con.query(`select order_id , Data_of_order from orders_cp_35 where customer_id = ${result[0].id} group by order_id;`,function(err,result){
                if(err) throw err ;
                res.send(result);
            })
        })
    });
}

export const SingleOrder = (req,res) => {
    // console.log(req.body.ID)
    con.query(`select * from orders_cp_35 where order_id = ${req.body.ID};`,function(err,result){
        if(err) throw err ;
        res.send(result);
    })
}