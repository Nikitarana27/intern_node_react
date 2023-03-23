import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function BranchEdit() {
    // variables for default values 
    const [branch1, setBranch1] = useState(
        {
            building_id: "",
            address: "",
            zip: "",
            manager_name: ""
        }
    );
    const history = useNavigate();

    //storing the values from form to variable
    const handlechange = (e) => {
        e.preventDefault();
        setBranch1({ ...branch1, [e.target.name]: e.target.value })
    }

    //this is default function this will run on load using use effect
    const defaultFunction = async () => {
        const resp = await axios.post("http://localhost:5000/getBranche", { id: localStorage.getItem('ID') });
        // console.log(resp.data);
        setBranch1(resp.data[0]);
    }

    //call on add
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
            // api which will add data to database 
            const resp = await axios.post("http://localhost:5000/updateBranch", { branch: branch1 });
            alert(resp.data);
            history("/Branches");
        }
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
                            <label for="building_id" className="form-label fw-bold">Building Id</label>
                            <Form.Control type="text" placeholder="Enter building id" required name="building_id" value={branch1.building_id} onChange={handlechange} ></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formLname">
                            <label for="address" className="form-label fw-bold" >Address</label>
                            <Form.Control type="text" placeholder="Enter address" name="address" required value={branch1.address} onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='d-flex '>
                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                            <label for="addrzipess" className="form-label fw-bold">zip</label>
                            <Form.Control type="text" placeholder="Enter zip" name="zip" value={branch1.zip} onChange={handlechange}></Form.Control>
                        </Form.Group>

                        <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                            <label for="manager_name" className="form-label fw-bold">Manager Name</label>
                            <Form.Control type="text" placeholder="Enter manager name" required name="manager_name" value={branch1.manager_name} onChange={handlechange}></Form.Control>
                        </Form.Group>
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-success m-1' onClick={handleAdd}>Edit</button>
                        <Link className='btn btn-danger m-1' to="/Branches">back</Link>
                    </div>

                </Form>

            </div>
        </div>
    )
}
