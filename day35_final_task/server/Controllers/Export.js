import exceljs from 'exceljs'

export const handleExport = (req, res) => {
    const data = req.body.User;
    // console.log(data);
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("User_Management");

    worksheet.columns = [
         { header: "Code", key: "code", width: 10 },
         { header: "Name", key: "name", width: 25 },
         { header: "Email", key: "email", width: 35 },
         { header: "Gender", key: "gender", width: 10 },
         { header: "Hobbies", key: "hobby", width: 50 },
         { header: "Status", key: "state", width: 10 },
         { header: "Created At", key: "dateadded", width: 25 },
         { header: "Updated At", key: "dateupdated", width: 25 },
         { header: "Country", key: "country", width: 25 },
    ]

    data.map((i) => worksheet.addRow(i)); 
    workbook.xlsx.writeFile("/Node/day35_final_task/server/Sheets/User_Management.xlsx");
    res.send("okay");
}