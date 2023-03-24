import exceljs from 'exceljs'
import con from '../connection/connection.js'

export const handleImport = async (req, res) => {
    // console.log("hello");
    const newData = [];
    //create excel workbook for reading file 
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.readFile("D://Node/day35_final_task/server/Sheets/users.xlsx");
    const worksheet = workbook.getWorksheet("User_Management");
    //convert single rows into js objects 
    worksheet.eachRow((row, rowCount) => {
        const singleRow = {
            code: row.values[1],
            firstname: row.values[2].trim().split(" ")[0],
            lastname: row.values[2].trim().split(" ")[1],
            email: row.values[3],
            gender: row.values[4],
            hobby: row.values[5],
            status: row.values[6],
            dateadded: row.values[7],
            dateupdated: row.values[8],
            country: row.values[9],
        };

        newData.push(singleRow);
    });

    // console.log(newData);
    con.query(`select id,code from User_Management_35;`, (err, result) => {
        if (err) throw err;
        for (let j = 1; j < newData.length; j++) {
            let count = 0;
            // console.log("hello");
            for (let i = 0; i < result.length; i++) {
                // console.log(result[i].code, newData[j].code);
                if (result[i].code == newData[j].code) {
                    count++;
                }
            }
            // console.log(count);
            if(count == 0){
                con.query(`insert into User_Management_35 (id, code, firstname, lastname, email, gender, hobby, filename, country, state, dateadded, dateupdated, endeffdt, active) values ("","${newData[j].code}","${newData[j].firstname}","${newData[j].lastname}","${newData[j].email}","${newData[j].gender}","${newData[j].hobby}","comman.jpg","","${newData[j].status}",concat(curdate()," ",curtime()),concat(curdate()," ",curtime()),"","yes");`,(err,result1)=>{
                    if(err) throw err;
                });
            }
            else{
                // update
                con.query(`update User_Management_35 set firstname="${newData[j].firstname}", lastname ="${newData[j].lastname}", email = "${newData[j].email}",gender = "${newData[j].gender}", hobby ="${newData[j].hobby}",state= "${newData[j].status}",country = "${newData[j].country}" where code = "${newData[j].code}";`,(err,result2)=>{
                    if(err) throw err;
                })
            }
        }
        res.send("okay");
    })
};
