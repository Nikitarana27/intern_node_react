import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Branches() {
    //store all values of branch
    const [branch, setBranch] = useState();
    //store filter value after branch
    const [branch2, setBranch2] = useState();
    const [table, setTable] = useState(true);
    const [form, setForm] = useState(false);
    const [search, setSearch] = useState("");
    const [branch1, setBranch1] = useState({
        building_id: "",
        address: "",
        zip: "",
        manager_name: ""
    });
    const history = useNavigate();
    //this is default function this will run on load using use effect
    const defaultFunction = async () => {
        const resp = await axios.get("http://localhost:5000/getBranches");
        // console.log(resp.data);
        setBranch(resp.data);
        setBranch2(resp.data);
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
            for (var i = 0; i < branch.length; i++) {
                if (branch[i].address.toLowerCase().includes(search.toLowerCase())) {
                    empl.push(branch[i]);
                }
            }
            setBranch2(empl);
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
        e.preventDefault()
        //validation
        if (branch1.building_id == "" || !(/^[a-zA-Z0-9]*$/.test(branch1.building_id))) {
            alert("enter building if properly");
        }
        else if (branch1.address == "" || !(/^[a-zA-Z]*$/.test(branch1.address))) {
            alert("enter address properly");
        }
        else if (branch1.zip == "" || !(/^[0-9]*$/.test(branch1.zip))) {
            alert("enter zip properly");
        }
        else if (branch1.manager_name == "" || !(/^[a-zA-Z]*[ ][a-zA-Z]*$/.test(branch1.manager_name))) {
            alert("enter manager name properly");
        }
        else {
            const resp = await axios.post("http://localhost:5000/addBranch", { branch: branch1 });
            alert(resp.data);
            setForm(false);
            setTable(true);
        }
    }

    //store values of form in variable
    const handlechange = (e) => {
        e.preventDefault();
        setBranch1({ ...branch1, [e.target.name]: e.target.value })
    }

    //id add branch is click then it will show form
    const handleBranch = () => {
        setForm(true);
        setTable(false);
    }

    //if edit is click it will go to BranchEdit  page
    const handleBranchEdit = (id) => {
        localStorage.setItem('ID', id);
        history("/BranchEdit");
    }

    //handle delete
    const handleDelete = async (id) => {
        await axios.post("http://localhost:5000/DeleteBranch", { Id: id });
        alert("branch deleted");
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
                            <div style={{ fontSize: "13px", margin: "5px", textAlign: "right" }}>search by address</div>
                        </Form.Group>
                    </Form>

                    <div className='m-3'>
                        <table className='table table-stripped '>
                            <thead>
                                <tr>
                                    <th className='bg-dark text-light'>id</th>
                                    <th className='bg-dark text-light'>building_id</th>
                                    <th className='bg-dark text-light'>address</th>
                                    <th className='bg-dark text-light'>zip</th>
                                    <th className='bg-dark text-light'>manager_name</th>
                                    <th className='bg-dark text-light'>Edit</th>
                                    <th className='bg-dark text-light'>Delete</th>
                                </tr>
                            </thead>
                            {branch2 &&
                                branch2.map((items) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{items.id}</td>
                                                    <td>{items.building_id}</td>
                                                    <td>{items.address}</td>
                                                    <td>{items.zip}</td>
                                                    <td>{items.manager_name}</td>
                                                    <td><button className='btn btn-success' onClick={() => handleBranchEdit(items.id)}>&#128393;</button></td>
                                                    <td><button className='btn btn-danger' onClick={() => handleDelete(items.id)}>X</button></td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })
                            }
                        </table>
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={handleBranch}>Add Branch
                        </button>
                    </div>
                </>
                : ""}

            {form ?
                <> <div className="border m-4 bg-light" style={{ borderRadius: "10px" }}>
                    <Form className="" style={{ margin: "5rem" }}>

                        <div className='d-flex '>
                            <Form.Group className="col-sm-6 mb-3 p-1" controlId="formFname">
                                <label for="building_id" className="form-label fw-bold">Building Id</label>
                                <Form.Control type="text" placeholder="Enter building id" required name="building_id" onChange={handlechange} ></Form.Control>
                            </Form.Group>

                            <Form.Group className="col-sm-6 mb-3 p-1" controlId="formLname">
                                <label for="address" className="form-label fw-bold" >Address</label>
                                <Form.Control type="text" placeholder="Enter address" name="address" required onChange={handlechange}></Form.Control>
                            </Form.Group>
                        </div>

                        <div className='d-flex '>
                            <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                                <label for="addrzipess" className="form-label fw-bold">zip</label>
                                <Form.Control type="text" placeholder="Enter zip" name="zip" onChange={handlechange}></Form.Control>
                            </Form.Group>

                            <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                                <label for="manager_name" className="form-label fw-bold">Manager Name</label>
                                <Form.Control type="text" placeholder="Enter manager name" required name="manager_name" onChange={handlechange}></Form.Control>
                            </Form.Group>
                        </div>

                        <div className='text-center'>
                            <button className='btn btn-success m-1' onClick={handleAdd}>Add</button>
                            <button className='btn btn-danger m-1' onClick={handleback}>back</button>
                        </div>

                    </Form>
                </div></>
                : ""}
        </div>
    )
}
