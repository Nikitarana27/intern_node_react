import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const history = useNavigate();
    //store all values of employees
    const [emp1, setEmp1] = useState();
    //store filter value after employee
    const [emp2, setEmp2] = useState();
    const [table, setTable] = useState(true);
    const [form, setForm] = useState(false);
    const [dropdown, setDropdown] = useState();
    const [search, setSearch] = useState("");
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
    //this is default function this will run on load using use effect
    const defaultFunction = async () => {
        const resp = await axios.get("http://localhost:5000/getEmployees");
        // console.log(resp.data.result1);
        setEmp1(resp.data.result1);
        setEmp2(resp.data.result1);
        setDropdown(resp.data.result2);
    }

    //search the value
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
        if (search.length === 0 || /^[ ]*$/.test(search)) {
            alert("enter something to search");
            defaultFunction();
        }
        else {
            let empl = []
            for (var i = 0; i < emp1.length; i++) {
                if (emp1[i].Firstname.toLowerCase().includes(search.toLowerCase())) {
                    empl.push(emp1[i]);
                }
            }

            setEmp2(empl);

        }
    }

    //id add employee is click then it will show form
    const AddEmployees = async () => {
        setTable(false);
        setForm(true);
    }
    //call when click add
    const handleAdd = async (e) => {
        e.preventDefault();
        // validation
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
            const resp = await axios.post("http://localhost:5000/addEmployees", { Emp: emp })
            alert("employee added");
            setForm(false);
            setTable(true);
        }
    }
    //call when click back
    const handleback = () => {
        setTable(true);
        setForm(false);
        defaultFunction();
    }

    //store values of form in variable
    const handlechange = (e) => {
        e.preventDefault();
        setEmp({ ...emp, [e.target.name]: e.target.value })
    }
    //if edit is click it will go to Edit  page
    const handleEdit = (id) => {
        localStorage.setItem("ID", id);
        history("/Edit");
    }
    
    //handle delete
    const handleDelete = async (id) => {
        await axios.post("http://localhost:5000/DeleteEmployee", { Id: id });
        alert("employee deleted");
        defaultFunction();
    }


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
                            <div style={{ fontSize: "13px", margin: "5px", textAlign: "right" }}>search by Firstname</div>
                        </Form.Group>
                    </Form>

                    <div className='m-3'>
                        <table className='table table-stripped '>
                            <thead>
                                <tr>
                                    <th className='bg-dark text-light'>id</th>
                                    <th className='bg-dark text-light'>Firstname</th>
                                    <th className='bg-dark text-light'>Lastname</th>
                                    <th className='bg-dark text-light'>address</th>
                                    <th className='bg-dark text-light'>contact</th>
                                    <th className='bg-dark text-light'>social_security_number</th>
                                    <th className='bg-dark text-light'>work_location</th>
                                    <th className='bg-dark text-light'>Salary</th>
                                    <th className='bg-dark text-light'>Edit</th>
                                    <th className='bg-dark text-light'>Delete</th>
                                </tr>
                            </thead>
                            {emp2 &&
                                emp2.map((items) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{items.id}</td>
                                                    <td>{items.Firstname}</td>
                                                    <td>{items.Lastname}</td>
                                                    <td>{items.address}</td>
                                                    <td>{items.contact}</td>
                                                    <td>{items.social_security_number}</td>
                                                    <td>{items.work_location}</td>
                                                    <td>{items.salary}</td>
                                                    {/* <td><button className='btn btn-success'>&#x270E;</button></td> for right lower pencil*/}
                                                    {/* <td><button className='btn btn-success'>&#x1F589;</button></td> for left lower pencil*/}
                                                    <td><button className='btn btn-success' onClick={() => handleEdit(items.id)}>&#128393;</button></td>
                                                    <td><button className='btn btn-danger' onClick={() => handleDelete(items.id)}>X</button></td>
                                                    {/* U+270E */}
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })
                            }
                        </table>
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={AddEmployees}>Add Employees
                        </button>
                    </div>
                </>
                : ""}
            {form ?
                <>
                    <div className="border m-4 bg-light" style={{ borderRadius: "10px" }}>
                        <Form className="" style={{ margin: "5rem" }}>

                            <div className='d-flex '>
                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formFname">
                                    <label for="Firstname" className="form-label fw-bold">First Name</label>
                                    <Form.Control type="text" placeholder="Enter first name" required name="Firstname" onChange={handlechange} ></Form.Control>
                                </Form.Group>

                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formLname">
                                    <label for="Lastname" className="form-label fw-bold" >Last Name</label>
                                    <Form.Control type="text" placeholder="Enter last name" name="Lastname" required onChange={handlechange}></Form.Control>
                                </Form.Group>
                            </div>

                            <div className='d-flex '>
                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                                    <label for="address" className="form-label fw-bold">Address</label>
                                    <Form.Control type="text" placeholder="Enter email" name="address" onChange={handlechange}></Form.Control>
                                </Form.Group>

                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                                    <label for="contact" className="form-label fw-bold">Contact Number</label>
                                    <Form.Control type="tel" placeholder="Enter phone number" required name="contact" onChange={handlechange}></Form.Control>
                                </Form.Group>
                            </div>

                            <div className='d-flex '>
                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                                    <label for="social_security_number" className="form-label fw-bold">social security number</label>
                                    <Form.Control type="text" placeholder="Enter social_security_number" name="social_security_number" required onChange={handlechange}></Form.Control>
                                </Form.Group>

                                <Form.Group className="col-sm-6 mb-3 p-1" controlId="formAbout">
                                    <label for="work_location" className="form-label fw-bold">Work Location</label>
                                    <select class="form-control" id="work_location" name="work_location" onChange={handlechange}>
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


