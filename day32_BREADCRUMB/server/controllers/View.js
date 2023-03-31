import con from '../connection/connection.js';

export const GetData = (req, res) => {
    con.query(`select * from breadcrumb_35 where parent = ${req.body.Id};`, function (err, result) {
        if (err) throw err;
        con.query(`select child from breadcrumb_35 where id = ${req.body.Id};`,function (err, result1) {
            if (err) throw err;
            res.send({result,result1});
        })
    })
}
export const getRootParent = (req, res) => {
    con.query(`select * from breadcrumb_35 where parent = 0;`, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
}

export const deleteitem = async (req, res) => {
    await deleteData(req.body.child_id)
   res.send("okay");
}

const deleteData = async (child_id) => {
        const query = `select id,child from breadcrumb_35 where parent=${child_id}`;
        con.query(query,async (err,result)=>{
            if(err) throw err;
           if(result != ""){
               for(let i = 0 ; i < result.length ; i++){
                deleteData(result[i].id);
               }
           }
           await deleteSingleData(child_id);
           return;
        });
    

        
}

  
  const deleteSingleData =async (child_id) => {
      const sqlQuery = `delete from breadcrumb_35 where id="${child_id}"`;
        con.query(sqlQuery,(err,result)=>{
            if(err) throw err;
            return result ;
        })
  };



 export const UpdateData = (req,res) => {
    console.log(req.body);
    con.query(`update breadcrumb_35 set child="${req.body.PERSON}" where id = ${req.body.ID};`,(err,result)=>{
        if(err) throw err;
        res.send("data updated");
    })
  }