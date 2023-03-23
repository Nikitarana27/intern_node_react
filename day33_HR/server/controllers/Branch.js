import con from '../Connection/Connection.js';

export const getBranches = (req, res) => {
    con.query(`select * from Locations_Table_35 where state = "active";`, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
}


export const addBranch = (req, res) => {
    con.query(`insert into Locations_Table_35 (building_id, address, zip, manager_name, id ,state) values("${req.body.branch.building_id}","${req.body.branch.address}",${req.body.branch.zip},"${req.body.branch.manager_name}","","active");`, function (err, result) {
        if (err) throw err;
        res.send("branch added");
    })
}

export const getBranche = (req, res) => {
    con.query(`select * from Locations_Table_35 where state = "active" and id = ${req.body.id};`, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
}

export const updateBranch = (req, res) => {
    con.query(`select address from Locations_Table_35 where id = ${req.body.branch.id}`, (err, result1) => {
        if (err) throw err;
        con.query(`update Locations_Table_35 set building_id = "${req.body.branch.building_id}", address = "${req.body.branch.address}", zip = ${req.body.branch.zip}, manager_name = "${req.body.branch.manager_name}" where id = ${req.body.branch.id};`, function (err, result) {
            if (err) throw err;
            con.query(`update emp_35 set work_location = "${req.body.branch.address}" where work_location = "${result1[0].address}"`, (err, result3) => {
                res.send("okay");
            })
        })
    })
}

export const DeleteBranch = (req, res) => {
    con.query(`update Locations_Table_35 set state = "inactive" where id = ${req.body.Id};`, (err, result5) => {
        if(err) throw err;
        con.query(`select address from Locations_Table_35 where id = ${req.body.Id}`, (err, result) => {
            if (err) throw err;
            con.query(`update emp_35 set state = "inactive" where work_location = "${result[0].address}";`, (err, result4) => {
                if (err) throw err;
            });
            con.query(`select id from emp_35 where work_location = "${result[0].address}"`, (err, result1) => {
                if (err) throw err;
                for (let i = 0; i < result1.length; i++) {
                    con.query(`update hr_data_35 set state = "inactive" where emp_id = ${result1[i].id}`);
                }
                res.send("okay");
            })
        })
    });
}