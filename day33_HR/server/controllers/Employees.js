import con from '../Connection/Connection.js';

export const getEmployees = (req, res) => {
    con.query(`select * from emp_35 where state = "active";`, function (err, result1) {
        if (err) throw err;

        con.query(`select distinct address from Locations_Table_35 where state = "active";`, function (err, result2) {
            if (err) throw err;
            res.send({ result1, result2 });
        })
    })
}


export const addEmployees = (req, res) => {

    con.query(`insert into emp_35 (id, Firstname, Lastname, contact, address, work_location, social_security_number, salary,state) values("","${req.body.Emp.Firstname}","${req.body.Emp.Lastname}",${req.body.Emp.contact},"${req.body.Emp.address}","${req.body.Emp.work_location}","${req.body.Emp.social_security_number}",${req.body.Emp.salary},"active");`, function (err, result) {
        if (err) throw err;
    });
    con.query(`insert into hr_data_35 (id, payroll, social_security_number, emp_id, salary, month_, year_,state) values("",${req.body.Emp.salary}-1000,"${req.body.Emp.social_security_number}",(select id from emp_35 where social_security_number = "${req.body.Emp.social_security_number}"),${req.body.Emp.salary},month(curdate()),year(curdate()),"active");`, function (err, result) {
        if (err) throw err;
        res.send("okay");
    })
}


export const getEmployee = (req, res) => {

    con.query(`select * from emp_35 where state = "active" and id = ${req.body.id};`, (err, result1) => {
        if (err) throw err;

        con.query(`select distinct address from Locations_Table_35 where state = "active";`, (err, result2) => {
            if (err) throw err;
            res.send({ result1, result2 });
        })
    })
}

export const updateemployee = (req, res) => {
    // console.log(req.body.Emp);
    con.query(`update emp_35 set Firstname = "${req.body.Emp.Firstname}", Lastname = "${req.body.Emp.Lastname}", contact = "${req.body.Emp.contact}", address = "${req.body.Emp.address}", work_location = "${req.body.Emp.work_location}", social_security_number = "${req.body.Emp.social_security_number}", salary = ${req.body.Emp.salary} where id = ${req.body.Emp.id}`, (err, result) => {
        if (err) throw err;
        con.query(`update hr_data_35 set social_security_number = "${req.body.Emp.social_security_number}",salary = ${req.body.Emp.salary} where emp_id = ${req.body.Emp.id}`, (err, result) => {
            if (err) throw err;
            res.send("okay");

        })
    })

}

export const DeleteEmployee = (req,res) => {
    con.query(`update emp_35 set state = "inactive" where id = ${req.body.Id}`,(err,result)=>{
        if(err) throw err;
        con.query(`update hr_data_35 set state = "inactive" where emp_id = ${req.body.Id}`,(err,result)=>{
            if(err) throw err;
            res.send("okay");
        })
    })
}