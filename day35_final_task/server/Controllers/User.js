import con from '../connection/connection.js'

export const getUser = (req, res) => {
    con.query(`select id, code,firstname,lastname, email, gender, hobby, filename, country, state, date_format(dateadded,"%d/%m/%Y %h:%i:%s") as dateadded,date_format(dateupdated,"%d/%m/%Y %h:%i:%s") as dateupdated, endeffdt, active from User_Management_35 where id = ${req.body.id} ;`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

export const getUsers = (req, res) => {
    con.query(`select id, code, concat(firstname," ",lastname) as name, email, gender, hobby, filename, country, state, dateadded, dateupdated, endeffdt, active from User_Management_35 where active = "yes" order by firstname,dateupdated;;`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

export const deleteUser = (req, res) => {
    con.query(`update User_Management_35 set active = "no",endeffdt = concat(curdate()," ",curtime()) where id = ${req.body.ID};`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

export const handleStatus = (req, res) => {
    console.log(req.body);
    if (req.body.State == "N") {
        con.query(`update User_Management_35 set state = "Y"  where id = ${req.body.ID}`, (err, result) => {
            if (err) throw err;
            res.send("OKAY");
        })
    }
    else {
        con.query(`update User_Management_35 set state = "N" where id = ${req.body.ID}`, (err, result) => {
            if (err) throw err;
            res.send("OKAY");
        })
    }
}

export const handleChangeProfile = (req, res) => {
    if (req.file == undefined) {
        res.send("upload image");
    }
    else {
        con.query(`update User_Management_35 
        set filename = "${req.file.originalname}"
        where id ="${req.params.id}";`, (err, result) => {
            if (err) throw err;
            res.send("profile changed");
        })
    }
}

export const handleEditUser = (req, res) => {
            if (req.body.firstname == "" || !(/^[0-9a-zA-Z]*$/.test(req.body.firstname))) {
                res.send("enter first name properly");
            }
            else if (req.body.lastname == "" || !(/^[0-9a-zA-Z]*$/.test(req.body.lastname))) {
                res.send("Enter Last Name Properly");
            }
            else if (req.body.email == "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
                res.send("please enter email in proper formate");
            }
            else if (req.body.gender == undefined) {
                res.send("please select your gender");
            }
            else if (req.body.country == "Choose Your Country...") {
                res.send("please select your country");
            }
            else if (req.body.hobby == undefined) {
                res.send("please select atleast one hobby");
            }
            else {
                con.query(`update User_Management_35 set firstname = "${req.body.firstname}", lastname = "${req.body.lastname}",  email ="${req.body.email}", gender= "${req.body.gender}", hobby = "${req.body.hobby}", country="${req.body.country}", dateupdated = concat(curdate()," ",curtime()) where id ="${req.params.id}";`, (err, result) => {
                    if (err) throw err;
                    res.send("user updated");
                })
            }
}

export const handleAddUser = (req, res) => {
    let count = 0;
    con.query(`select code from User_Management_35;`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            if (result[i].code == req.body.code) {
                res.send("code is already taken please select another code");
                break;
            }
            else {
                count++;
            }
        }
        if (count == result.length) {
            if (req.body.code == "" || !(/^[0-9a-zA-Z]*$/.test(req.body.code))) {
                res.send("enter Proper code");
            }
            else if (!(req.body.code.length == 6)) {
                res.send("code should be of length 6");
            }
            else if (req.body.firstname == "" || !(/^[0-9a-zA-Z]*$/.test(req.body.firstname))) {
                res.send("enter first name properly");
            }
            else if (req.body.lastname == "" || !(/^[0-9a-zA-Z]*$/.test(req.body.lastname))) {
                res.send("Enter Last Name Properly");
            }
            else if (req.body.email == "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
                res.send("please enter email in proper formate");
            }
            else if (req.body.gender == undefined) {
                res.send("please select your gender");
            }
            else if (req.body.country == "Choose Your Country...") {
                res.send("please select your country");
            }
            else if (req.file == undefined) {
                res.send("upload image");
            }
            else if (req.body.hobby == undefined) {
                res.send("please select atleast one hobby");
            }
            else {
                con.query(`insert into User_Management_35 (id, code, firstname, lastname, email, gender, hobby, filename, country, state, dateadded, dateupdated, endeffdt) values ("","${req.body.code}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.gender}","${req.body.hobby}","${req.file.originalname}","${req.body.country}","N",concat(curdate()," ",curtime()),"","");`, (err, result) => {
                    if (err) throw err;
                    res.send("user added");
                })
            }
        }
    });
}