import con from "../connection/connection.js";

export const getParentForSelection = (req, res) => {
    con.query(`select child from breadcrumb_35;`, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
}

export const ParentEnter = (req, res) => {
    con.query(`insert into breadcrumb_35 (id, child, parent) values ("","${req.body.Cname}",0);`, function (err, result) {
        if (err) throw (err);
        res.send("parent Added");
    })
}


export const ChildEnter = (req, res) => {
    con.query(`select id from breadcrumb_35 where child = "${req.body.Cselection}";`, function (err, result) {
        if (err) throw err;
        con.query(`insert into breadcrumb_35 (id, child,parent) values ("","${req.body.Cname}",${result[0].id});`, (err, result) => {
            if (err) throw err;
            res.send("data added");
        })
    })
}

