import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Registration.css';
import axios from 'axios';

export default function Registration() {
    const [customer, setCustomer] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        Password: "",
        Cpassword: "",
        Mobile: "",
        DOB: "",
        Address: "",
        Gender: ""
    });

    const history = useNavigate();

    //handle change will save the form data in useState 
    const handlechange = (e) => {
        e.preventDefault();
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    //validation of data and further process
    const handleRegister = async (e) => {
        e.preventDefault();
        if (customer.Firstname === "" || !(/^[A-Za-z]*$/.test(customer.Firstname))) {
            alert("please enter First name properly");
        }
        else if (customer.Lastname === "" || !(/^[A-Za-z]*$/.test(customer.Lastname))) {
            alert("please enter Last name properly");
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customer.Email))) {
            alert("please enter email in proper formate");
        }
        else if (customer.Password === "") {
            alert("enter password");
        }
        else if (customer.Password.length < 5) {
            alert("length of password must be more then 4");
        }
        else if (customer.Password !== customer.Cpassword) {
            alert("password and confirm password didn't match");
        }
        else if (isNaN(customer.Mobile)) {
            alert("enter numeric value in mobile number");
        }
        else if (customer.Mobile.length !== 10) {
            alert("mobile number length should be 10");
        }
        else if (customer.Address === "" ) {
            alert("please enter address properly");
        }
        else if (!(customer.DOB)) {
            alert("enter date of birth");
        }
        else if (!(customer.Gender)) {
            alert("select your gender");
        }
        else {
            //if email is unique then only you can register yourself
            const localhost = "http://localhost:5000/register"
            const resp = await axios.post(localhost, {
                fname: customer.Firstname,
                lname: customer.Lastname,
                email: customer.Email,
                pwd: customer.Password,
                mobile: customer.Mobile,
                date: customer.DOB,
                address: customer.Address,
                gender: customer.Gender
            });

            //here i have set unique email
            if(resp.data === "email alreasy exist.. enter another email"){
                alert(resp.data);
                document.getElementById("email").focus();
            }
            else{
                alert(resp.data);
                history("/Login");
            }
        }
    }
  

    return (
        <div >
            <div className="wrapper">
                <div className="form-left">
                    <div className="form-field">
                        <input type="submit" className="account" value="Have an Account?" onClick={() => history("/Login")} />
                    </div>
                </div>
                <form className="form-right">
                    <h2 className="text-uppercase">Registration form</h2>
                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label>First Name</label>
                            <input type="text" name="Firstname" id="Firstname" className="input-field" value={customer.Firstname} onChange={handlechange} />
                        </div>
                        <div className="col-sm-6 mb-3">
                            <label>Last Name</label>
                            <input type="text" name="Lastname" id="Lastname" className="input-field" value={customer.Lastname} onChange={handlechange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Your Email</label>
                        <input type="email" className="input-field" id="email" name="Email" required value={customer.Email} onChange={handlechange} />
                    </div>
                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label>Password</label>
                            <input type="password" name="Password" id="Password" className="input-field"  style={{background: "white"}} value={customer.Password} onChange={handlechange} />
                        </div>
                        <div className="col-sm-6 mb-3">
                            <label>Confirm Password</label>
                            <input type="password" name="Cpassword" id="Cpassword" className="input-field" style={{background: "white"}}  value={customer.Cpassword} onChange={handlechange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label>Mobile Number</label>
                            <input type="text" name="Mobile" id="Mobile" className="input-field" value={customer.Mobile} onChange={handlechange} />
                        </div>

                        <div className="col-sm-6 mb-3">
                            <label>Date of birth</label>
                            <input type="date" name="DOB" id="DOB" className="input-field" value={customer.DOB} onChange={handlechange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Address</label>
                        <input type="textarea" className="input-field" name="Address" required value={customer.Address} onChange={handlechange} />
                    </div>
                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label>Gender</label>
                            <div style={{ display: "flex" }}>
                                <input type="radio" name="Gender" id="male" className="input-field "  value="male" onChange={handlechange} />
                                <label >Male</label>
                                <input type="radio" name="Gender" id="female" className="input-field" value="female" onChange={handlechange} />
                                <label >Female</label>
                            </div>
                        </div>
                        <div className="form-field ">
                            <button value="Register" className="register" onClick={handleRegister}>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
