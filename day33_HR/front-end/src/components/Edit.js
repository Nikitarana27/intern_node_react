import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function Edit() {
    //this is variable for work_location 
    const [dropdown, setDropdown] = useState();

    // variable for form
    const [emp, setEmp] = useState({
        id: "",
        Firstname: "",
        Lastname: "",
        address: "",
        contact: "",
        social_security_number: "",
        work_location: "",
        salary: ""
    });
    const history = useNavigate();

    //this is default function this will run on load using use effect
    const defaultFunction = async () => {
        const resp = await axios.post("http://localhost:5000/getEmployee", { id: localStorage.getItem("ID") });
        setDropdown(resp.data.result2);
        setEmp(resp.data.result1[0]);
        console.log(resp.data.result1[0]);
    }

    //call on Edit
    const handleAdd = async (e) => {
        e.preventDefault();
        //validation
        if (emp.Firstname == "" || !(/^[A-Za-z]*$/.test(emp.Firstname))) {
            alert("enter first name Properly");
        }
        else if (emp.Lastname === "" || !(/^[A-Za-z]*$/.test(emp.Lastname))) {
            alert("enter last name Properly");
        }
        else if (emp.address === "" || !(/^[A-Za-z]*$/.test(emp.address))) {
            alert("enter address Properly");
        }
        else if (isNaN(emp.contact) || emp.contact == "") {
            alert("enter contact number Properly");
        }
        else if (emp.contact.length != 10) {
            alert("contact should be of length 10");
        }
        else if (!(/^[A-Za-z0-9]*$/.test(emp.social_security_number)) || emp.social_security_number == "") {
            alert("enter social security number properly");
        }
        else if (!(/^[A-Za-z]*$/.test(emp.work_location)) || emp.work_location == "") {
            alert("enter work location properly");
        }
        else if (emp.salary == "" || !(/^[0-9]*$/.test(emp.salary))) {
            alert("salary Properly");
        }
        else {
            // api which will add data to database 
            const resp = await axios.post("http://localhost:5000/updateemployee", { Emp: emp })
            alert("employee added");
            history("/");
        }
    }

    //store values in variables
    const handlechange = (e) => {
        e.preventDefault();
        setEmp({ ...emp, [e.target.name]: e.target.value })
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
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formFname">
                            <label for="Firstname" className="form-label fw-bold">First Name</label>
                            <Form.Control type="text" placeholder="Enter first name" required name="Firstname" value={emp.Firstname} onChange={handlechange} ></Form.Control>
                        </Form.Group>

                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formLname">
                            <label for="Lastname" className="form-label fw-bold" >Last Name</label>
                            <Form.Control type="text" placeholder="Enter last name" name="Lastname" value={emp.Lastname} required onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='d-flex '>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                            <label for="address" className="form-label fw-bold">Address</label>
                            <Form.Control type="text" placeholder="Enter email" name="address" value={emp.address} onChange={handlechange}></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                            <label for="contact" className="form-label fw-bold">Contact Number</label>
                            <Form.Control type="tel" placeholder="Enter phone number" required name="contact" value={emp.contact} onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='d-flex '>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                            <label for="social_security_number" className="form-label fw-bold">social security number</label>
                            <Form.Control type="text" placeholder="Enter social_security_number" name="social_security_number" value={emp.social_security_number} required onChange={handlechange}></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formAbout">
                            <label for="work_location" className="form-label fw-bold">Work Location</label>
                            <select class="form-control" id="work_location" name="work_location" value={emp.work_location} onChange={handlechange}>
                                <option selected value="choose">Choose...</option>
                                {dropdown &&
                                    dropdown.map((items) => {
                                        return (
                                            <>
                                                <option value={items.address} name={items.address}>{items.address}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </Form.Group>
                    </div>

                    <div>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formAbout">
                            <label for="salary" className="form-label fw-bold">Salary</label>
                            <Form.Control type="text" placeholder="Enter salary" name="salary" value={emp.salary} required onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-success m-1' onClick={handleAdd}>Edit</button>
                        <Link className='btn btn-danger m-1' to="/">back</Link>
                    </div>

                </Form>

            </div>
        </div>
    )
}

