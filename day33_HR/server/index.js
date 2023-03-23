import express from 'express';
import cors from 'cors';
import con from './connection/connection.js';
import empRoutes from './routes/Employees.js';


const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use("/",empRoutes);

const PORT = process.env.PORT || 5000;

con.connect(() => {
    console.log("connected");
})

app.get("/", (req, res) => {
    res.send("hello");
})

app.get("*",(req,res)=>{
    res.send("invalid route");
})

app.listen(PORT, () => {
    console.log(`listenning on port ${PORT}`)
});