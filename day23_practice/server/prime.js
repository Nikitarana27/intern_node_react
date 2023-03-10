const q = url.parse(req.url, true);
var qdata = q.query
// console.log(q.query);
// console.log(qdata)
app.get("/",function(req,res){
  res.write("hrll");
  
  const fnumber = qdata.fnumber;
  const snumber = qdata.snumber;
    res.write(fnumber);
    res.write(snumber);
    // console.log(fnumber);
    
    // program to check if a number is prime or not
    
    
    res.end();
  
});