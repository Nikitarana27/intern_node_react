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

    res.send("okay");
});

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT} `);
})