import express from 'express';
import cors from 'cors';
import con from './connection/connection.js';
import UserRouter from './Routers/User.js';
import {getCurrentDir} from './static-path/Static-path.js';
import { join } from "path";

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use("/",UserRouter);
app.use(express.static(join(getCurrentDir(), "client/public")));



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