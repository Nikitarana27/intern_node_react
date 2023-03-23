import express, { response } from 'express';
import cors from 'cors';
import con from './connection/connection.js';
import RegisterRoutes from './routes/Register.js';
import ProductsRoutes from './routes/Products.js';
import CartRoutes from './routes/Cart.js';
import OrderRoutes from './routes/Order.js';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(bodyParser.json());
app.use("/",RegisterRoutes);
app.use("/",ProductsRoutes);
app.use("/",CartRoutes);
app.use("/",OrderRoutes);

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