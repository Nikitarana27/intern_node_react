import express, { response } from 'express';
import cors from 'cors';
import con from './connection/connection.js'
// import bodyParser from 'bodyParser';

const app = express();
app.use(cors());
app.use(express.json({extended: true}));

const PORT = process.env.PORT || 5000;

con.connect(()=>{
    console.log("connected");
})

app.post("/bugs",(req,res)=>{
    const title = req.body.Title;
    const description = req.body.Description;
    const assignee = req.body.Assignee;
    const sql = `insert into bugs_35 (Title, Description, Time_, Date_, Assignee)
    values ("${title}","${description}",curtime(),curdate() ,"${assignee}");`
    con.query(sql, function (err, result) {
        if (err) throw err;
      });
res.send("okay");
});

app.get("/ShowBugs",(req,res) => {
    const sql1 = "SELECT *,DATEDIFF(CURDATE(),Date_) as diff FROM bugs_35;"
    con.query(sql1, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
      });
})

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT} `);
})