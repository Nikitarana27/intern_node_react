import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Registration.css';

export default function Registration() {
    const [register, setRegister] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });
    const history = useNavigate();

    // setting variable
    const handleChange = (e) => {
        e.preventDefault();
        setRegister({ ...register, [e.target.name]: e.target.value });
        
    }
    
    //making invisible the msg
    const hide = () =>{
        document.getElementById("email").setAttribute("style","visibility: hidden");
        document.getElementById("password").setAttribute("style","visibility: hidden");
        document.getElementById("lastName").setAttribute("style","visibility: hidden");
        document.getElementById("firstName").setAttribute("style","visibility: hidden");
    }
                

    const handleSubmit = async (e) => {
        e.preventDefault();
        //checking email
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.Email)) {
            //checking first name
            if (register.FirstName === "" || !(/^[A-Za-z]*$/.test(register.FirstName))) {
                document.getElementById("firstName").setAttribute("style","visibility: visible");
                document.getElementById("firstName").innerHTML = "enter Firstname properly..";
                setTimeout(hide,1000);
            }
            //checking last name
            else{
                if(register.LastName === "" || !(/^[A-Za-z]*$/.test(register.LastName))){
                    document.getElementById("lastName").setAttribute("style","visibility: visible");
                    document.getElementById("lastName").innerHTML = "enter Firstname properly..";
                    setTimeout(hide,1000);
                }
                else{
                    if(register.Password === ""){
                        document.getElementById("password").setAttribute("style","visibility: visible")
                        document.getElementById("password").innerHTML = "you must enter password";
                        setTimeout(hide,1000);
                    }
                    else{
                    if(register.Password === register.ConfirmPassword){
                        const localhost = "http://localhost:5000/Register";
                        const res = await axios.post(localhost , {fname : register.FirstName , lname : register.LastName , email : register.Email , password : register.Password });
                        history("/Login");
                        console.log(res.data);

                    }
                    else{
                        document.getElementById("password").setAttribute("style","visibility: visible");
                        document.getElementById("password").innerHTML = "password and confirm password didn't match";
                        setTimeout(hide,1000);
                    }
                    }
                }
            }
        
        }       
        else {
            document.getElementById("email").setAttribute("style","visibility: visible");
            document.getElementById("email").innerHTML = "enter proper email..."
            setTimeout(hide,1000);
        }

    }

    useEffect(() => {
        console.log(register);
    });

    return (

        <div className='Register'>

            <div style={{ display: "flex", justifyContent: "center" }} >
                <form className='w-50' style={{ margin: "10%" }}>
                    <fieldset className='border p-3'>
                        <legend className='text-center fw-bold text-success' >Register</legend>

                        <div className="mb-3 row">
                            <label for="FirstName" className="col-sm-2 col-form-label">FirstName</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="FirstName" name="FirstName" value={register.FirstName} onChange={handleChange} />
                                <span id="firstName" className='fs-small text-danger'></span>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="LastName" className="col-sm-2 col-form-label">LastName</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="LastName" name="LastName" value={register.LastName} onChange={handleChange} />
                                <span id="lastName" className='fs-small text-danger'></span>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="Email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="Email" className="form-control" id="Email" name="Email" value={register.Email} onChange={handleChange} />
                                <span id="email" className='fs-small text-danger'></span>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="Password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="Password" className="form-control" id="Password" name="Password" value={register.Password} onChange={handleChange} />
                                {/* <span id="assignee_check" className='fs-small text-danger'></span> */}
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="ConfirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                            <div className="col-sm-10">
                                <input type="Password" className="form-control" id="ConfirmPassword" name="ConfirmPassword" value={register.ConfirmPassword} onChange={handleChange} />
                                <span id="password" className='fs-small text-danger'></span>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button className='btn btn-success m-1' onClick={handleSubmit}>Register</button><br></br>
                            <span className='fs-6'>if already register do login</span><br></br>
                            <button className='btn btn-success m-1' onClick={() => history("/Login")} >Login</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
