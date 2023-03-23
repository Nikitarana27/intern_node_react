import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function HrEdit() {
    //this is variable for emp_is 
    const [dropdown, setDropdown] = useState();
    // variable for form
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
        const resp = await axios.post("http://localhost:5000/getOneHR", { id: localStorage.getItem('ID') });
        console.log(resp.data);
        setHr1(resp.data.result[0]);
        setDropdown(resp.data.result1);
    }

    //call on Edit
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
            // api which will add data to database 
            const resp = await axios.post("http://localhost:5000/updateInHrTable", { hr: hr1 });
            alert(resp.data);
            history("/HR");
        }
    }

    //store values in variables
    const handlechange = (e) => {
        e.preventDefault();
        setHr1({ ...hr1, [e.target.name]: e.target.value })
    }

    //used to call default function
    useEffect(() => {
        defaultFunction();
    }, [])

    return (
        <div>
            <div className="border m-4 bg-light" style={{ borderRadius: "10px" }}>

                <Form className="" style={{ margin: "5rem" }}>

                    <div className='d-flex '>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="emp_id">
                            <label for="emp_id" className="form-label fw-bold">Employee Id</label>
                            <select class="form-control" id="emp_id" name="emp_id" value={hr1.emp_id} onChange={handlechange}>
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
                            <Form.Control type="text" placeholder="Enter payroll" name="payroll" required value={hr1.payroll} onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='d-flex '>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="month_">
                            <label for="month_" className="form-label fw-bold">Month</label>
                            <Form.Control type="text" placeholder="Enter month" name="month_" value={hr1.month_} onChange={handlechange}></Form.Control>
                        </Form.Group>

                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                            <label for="year_" className="form-label fw-bold">Year</label>
                            <Form.Control type="text" placeholder="Enter year" required name="year_" value={hr1.year_} onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formAbout">
                            <label for="salary" className="form-label fw-bold">Salary</label>
                            <Form.Control type="text" placeholder="Enter salary" name="salary" required value={hr1.salary} onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-success m-1' onClick={handleAdd}>Edit</button>
                        <Link className='btn btn-danger m-1' to="/HR">back</Link>
                    </div>

                </Form>

            </div>
        </div>
    )
}
