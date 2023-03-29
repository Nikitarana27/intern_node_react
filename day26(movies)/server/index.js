import express from 'express';
import cors from 'cors';
import con from './connection/connection.js';

const app =express();
app.use(cors());
app.use(express.json({extended: true}));
const PORT =process.env.PORT || 5000;

con.connect(()=>{
    console.log("connected");
})

app.get("/ShowMovies",(req,res)=>{
        var sql = "select * from movies_35;";
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send(result);
        });
  });

app.get("/HighestRating",(req,res)=>{
    var sql = "select name from movies_35 order by ratings desc limit 3;";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/UpdateRating",(req,res)=>{
  var sql = `select * from movies_35 where Movie_Type = "comedy";`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/UpdateRate", (req,res) => {
  var input = req.body.number;
  var name = req.body.name;
  // console.log(input , name)
  var sql = `update movies_35 set ratings = `+input+` where name = "`+name+`";`;
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  res.send("okay");
});

app.get("/DeleteMovie",(req,res) =>{
  
  var sql1 = `select * from movies_35 order by ratings limit 1;`; 
  con.query(sql1, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
  var sql = `delete from movies_35 order by ratings limit 1;`; 
   con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table data deleted");
    });
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT} `);
})