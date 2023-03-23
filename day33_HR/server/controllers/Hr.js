import con from '../Connection/Connection.js';

export const getHR = (req, res) => {
    con.query(`select * from hr_data_35 where state = "active";`, function (err, result) {
        if (err) throw err;
        con.query(`select id from emp_35 where state = "active";`, function (err, result1) {
            if (err) throw err;
            res.send({ result, result1 });
        })
    })
}

export const addInHrTable = (req, res) => {
    con.query(`select * from emp_35 where id = ${req.body.hr.emp_id} and state = "active";`, function (err, result) {
        if (err) throw err;
        con.query(`select * from hr_data_35 where emp_id = ${req.body.hr.emp_id} and state = "active"`, function (err, result3) {
            if (err) throw err;
            con.query(`insert into hr_data_35 (id, payroll, social_security_number, emp_id, salary, month_, year_,state) values("",${req.body.hr.payroll},"${result[0].social_security_number}",${req.body.hr.emp_id},${req.body.hr.salary},${req.body.hr.month_},${req.body.hr.year_},"active")`, function (err, result1) {
                if (err) throw err;
                let count = 0;
                for (let i = 0; i < result3.length; i++) {
                    if (result3[i].year_ >= req.body.hr.year_) {
                        if (result3[i].month_ >= req.body.hr.month_) {
                            count++;
                        }
                    }
                }
                if (count == 0) {
                    con.query(`update emp_35 set salary = ${req.body.hr.salary} where id = ${req.body.hr.emp_id} and state = "active";`, function (err, result2) {
                        if (err) throw err;
                        res.send("details added");
                    })
                } else {
                    res.send("details added");
                }
            })
        })
    })
}

export const getOneHR = (req, res) => {
    con.query(`select * from hr_data_35 where state = "active" and id = ${req.body.id};`, function (err, result) {
        if (err) throw err;
        con.query(`select id from emp_35 where state = "active";`, function (err, result1) {
            if (err) throw err;
            res.send({ result, result1 });
        })
    })
}

export const updateInHrTable = (req, res) => {

    con.query(`select * from emp_35 where id = ${req.body.hr.emp_id} and state = "active";`, function (err, result) {
        if (err) throw err;
        con.query(`select * from hr_data_35 where emp_id = ${req.body.hr.emp_id} and state = "active"`, function (err, result3) {
            if (err) throw err;
            con.query(`update hr_data_35 set payroll = ${req.body.hr.payroll}, social_security_number = "${result[0].social_security_number}", emp_id = ${req.body.hr.emp_id}, salary = ${req.body.hr.salary}, month_ = ${req.body.hr.month_}, year_ = ${req.body.hr.year_} where id = ${req.body.hr.id}`, function (err, result1) {
                if (err) throw err;
                let count = 0;
                for (let i = 0; i < result3.length; i++) {
                    if (result3[i].year_ >= req.body.hr.year_) {
                        if (result3[i].month_ >= req.body.hr.month_) {
                            count++;
                        }
                    }
                }
                if (count == 0) {
                    con.query(`update emp_35 set salary = ${req.body.hr.salary} where id = ${req.body.hr.emp_id} and state = "active";`, function (err, result2) {
                        if (err) throw err;
                        res.send("details added");
                    })
                } else {
                    res.send("details added");
                }
            })
        })
    })
}

export const DeleteHrDetail = (req, res) => {
    con.query(`update hr_data_35 set state = "inactive" where id = ${req.body.Id}`, (err, result) => {
        if (err) throw err;
        con.query(`select max(month_) as mon from hr_data_35 where emp_id= ${req.body.emp_id} and state = "active" group by emp_id;`, (err, result1) => {
            if (err) throw err;
            con.query(`select salary from hr_data_35 where emp_id = ${req.body.emp_id} and month_ = ${result1[0].mon} ;`, (err, result2) => {
                if (err) throw err;
                    con.query(`update emp_35 set salary = ${result2[0].salary} where id = ${req.body.emp_id}`, (err, result) => {
                        if (err) throw err;
                        res.send("okay");
                    })
            })
        })

    })
    // con.query(`update hr_data_35 set state = "inactive" where id = ${req.body.Id}`,(err,result)=>{
    //     if(err) throw err;
    //     res.send("okay");
    // })
}