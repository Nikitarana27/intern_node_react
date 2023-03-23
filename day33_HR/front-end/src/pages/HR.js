import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HR() {
    //store all values of hr
    const [hr, setHr] = useState();
    //store filter value after search
    const [hr2, setHr2] = useState();
    const [table, setTable] = useState(true);
    const [form, setForm] = useState(false);
    const [dropdown, setDropdown] = useState();
    const [search, setSearch] = useState("");
    const [hr1, setHr1] = useState({
        emp_id: "",
        payroll: "",
        month_: "",
        year_: "",
        salary: ""
    })
    const history = useNavigate();
    //this is default function this will run on load using use effect
    const defaultFunction = async () => {
        const resp = await axios.get("http://localhost:5000/getHR");
        setHr(resp.data.result);
        setHr2(resp.data.result);
        setDropdown(resp.data.result1);
    }
    //search the value
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
        if (search.length === 0 || isNaN(search) || /^[ ]*$/.test(search)) {
            alert("enter numeric value to search");
            defaultFunction();
        }
        else {
            let empl = []
            for (var i = 0; i < hr.length; i++) {
                if (hr[i].emp_id == search) {
                    empl.push(hr[i]);
                }
            }
            setHr2(empl);
        }
    }
    //call when click back
    const handleback = () => {
        setTable(true);
        setForm(false);
        defaultFunction();
    }
    //call when click add
    const handleAdd = async (e) => {
        e.preventDefault();
        //validation
        if (hr1.emp_id == "" || !(/^[0-9]*$/.test(hr1.emp_id))) {
            alert("select proper employee id");
        }
        else if (hr1.payroll == "" || !(/^[0-9]*$/.test(hr1.payroll))) {
            alert("enter proper value for payroll");
        }
        else if (hr1.month_ == "" || !(/^[0-9]*$/.test(hr1.month_))) {
            alert("enter month must be in numeric");
        }
        else if (hr1.month_ <= 0 || hr1.month_ >= 13) {
            alert("month should be in range 1 to 12");
        }
        else if (hr1.year_ == "" || !(/^[0-9]*$/.test(hr1.year_))) {
            alert("enter year must be in numeric");
        }
        else if (hr1.year_.length !== 4) {
            alert("length of year should be 4");
        }
        else if (hr1.salary == "" || !(/^[0-9]*$/.test(hr1.salary))) {
            alert("enter year must be in numeric");
        }
        else {
            const resp = await axios.post("http://localhost:5000/addInHrTable", { hr: hr1 });
            alert(resp.data);
            setTable(true);
            setForm(false);
        }
    }
    //store values of form in variable
    const handlechange = (e) => {
        e.preventDefault();
        setHr1({ ...hr1, [e.target.name]: e.target.value })
    }
    //id add details is click then it will show form
    const handleHr = () => {
        setTable(false);
        setForm(true);
    }
    //if edit is click it will go to HrEdit page
    const handleHrEdit = (id) => {
        localStorage.setItem('ID', id);
        history("/HrEdit");
    }
    //handle delete
    const handleDelete = async (id, eid) => {
        await axios.post("http://localhost:5000/DeleteHrDetail", { Id: id, emp_id: eid });
        alert("data deleted");
        defaultFunction();
    }
    //used to call default function
    useEffect(() => {
        defaultFunction();
    }, [])
    return (
        <div>
            <div><Header /></div>
            {table ?
                <>
                    <Form className="" style={{ margin: "1rem" }}>
                        <Form.Group className="col-sm-3 " controlId="formFname">
                            <div className='d-flex justify-content-right'>
                                {/* <label for="search" className="form-label fw-bold">Search</label> */}
                                <button className='btn btn-primary m-1' onClick={handleSearch}>&#x1F50D;</button>
                                <Form.Control type="text" placeholder="Search Here" required name="search" onChange={(e) => setSearch(e.target.value)}></Form.Control>
                            </div>
                            <div style={{ fontSize: "13px", margin: "5px", textAlign: "right" }}>search by emp_id</div>
                        </Form.Group>
                    </Form>

                    <div className='m-3'>

                        <table className='table table-stripped '>
                            <thead>
                                <tr>
                                    <th className='bg-dark text-light'>id</th>
                                    <th className='bg-dark text-light'>payroll</th>
                                    <th className='bg-dark text-light'>social_security_number</th>
                                    <th className='bg-dark text-light'>emp_id</th>
                                    <th className='bg-dark text-light'>salary</th>
                                    <th className='bg-dark text-light'>month_</th>
                                    <th className='bg-dark text-light'>year_</th>
                                    <th className='bg-dark text-light'>Edit</th>
                                    <th className='bg-dark text-light'>Delete</th>
                                </tr>
                            </thead>
                            {hr2 &&
                                hr2.map((items) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{items.id}</td>
                                                    <td>{items.payroll}</td>
                                                    <td>{items.social_security_number}</td>
                                                    <td>{items.emp_id}</td>
                                                    <td>{items.salary}</td>
                                                    <td>{items.month_}</td>
                                                    <td>{items.year_}</td>
                                                    <td><button className='btn btn-success' onClick={() => handleHrEdit(items.id)}>&#128393;</button></td>
                                                    <td><button className='btn btn-danger' onClick={() => handleDelete(items.id, items.emp_id)}>X</button></td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })
                            }
                        </table>

                    </div>

                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={handleHr}>Add Details
                        </button>
                    </div>
                </>
                : ""}
            {form ?
                <>
                    <div className="border m-4 bg-light" style={{ borderRadius: "10px" }}>
                        <Form className="" style={{ margin: "5rem" }}>

                            <div className='d-flex '>
                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="emp_id">
                                    <label for="emp_id" className="form-label fw-bold">Employee Id</label>
                                    <select class="form-control" id="emp_id" name="emp_id" onChange={handlechange}>
                                        <option selected value="choose">Choose...</option>
                                        {dropdown &&
                                            dropdown.map((items) => {
                                                return (
                                                    <>
                                                        <option value={items.id} name={items.id}>{items.id}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Group>

                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formLname">
                                    <label for="payroll" className="form-label fw-bold" >Payroll</label>
                                    <Form.Control type="text" placeholder="Enter payroll" name="payroll" required onChange={handlechange}></Form.Control>
                                </Form.Group>
                            </div>

                            <div className='d-flex '>
                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="month_">
                                    <label for="month_" className="form-label fw-bold">Month</label>
                                    <Form.Control type="text" placeholder="Enter month" name="month_" onChange={handlechange}></Form.Control>
                                </Form.Group>

                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                                    <label for="year_" className="form-label fw-bold">Year</label>
                                    <Form.Control type="text" placeholder="Enter year" required name="year_" onChange={handlechange}></Form.Control>
                                </Form.Group>
                            </div>

                            <div>
                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formAbout">
                                    <label for="salary" className="form-label fw-bold">Salary</label>
                                    <Form.Control type="text" placeholder="Enter salary" name="salary" required onChange={handlechange}></Form.Control>
                                </Form.Group>
                            </div>

                            <div className='text-center'>
                                <button className='btn btn-success m-1' onClick={handleAdd}>Add</button>
                                <button className='btn btn-danger m-1' onClick={handleback}>back</button>
                            </div>

                        </Form>
                    </div>
                </>
                : ""}
        </div>
    )
}
