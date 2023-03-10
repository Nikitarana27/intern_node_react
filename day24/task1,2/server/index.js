import express from "express";
import cors from "cors";
const app = express();


app.use(cors());
app.use(express.json({ extended: true }));

//api for prime number
app.post("/primeNumber", (req, res) => {
  //getting input which is passed from react throught axios
  let input = req.body.number;
  let temp = [];
  let count = 0;
  //logic for prime number
    for (let x = 2; x <= input; x++) {
      count = 0;
      for (let y = 1; y <= x; y++) {
        if (x % y == 0) {
          count++;
        }
      }
      if (count <= 2) {
        temp.push(x);
      }
    }

    console.log(temp);
    //sending response
    res.send(temp);
});

//api for powering the number
app.post("/findPower", (req, res) => {
  let first = req.body.first;
  let second = req.body.second;
  let result = Math.pow(first, second);
  res.send(result.toString());
});

app.listen(8000, () => {
  console.log("listening 8000");
});




