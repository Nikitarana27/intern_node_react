import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

export default function Login() {
    const [customer, setCustomer] = useState({
        Email: "",
        Password: ""
    });
    const Navigate = useNavigate();


    const handleLogin = async (e) => {  
        e.preventDefault();
//validation
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customer.Email))){
            alert("enter email in proper formate");
        }
        else if(customer.Password === ""){
            alert ("please enter password");
        }
        else{
            //login if credential matches
        const localhost = "http://localhost:5000/Login"
        const resp = await axios.post(localhost, { email: customer.Email, password: customer.Password });
        if (resp.data === "invalid email.. please register yourself first") {
            alert(resp.data);
            Navigate("/");
        }
        else if (resp.data === "password invalid") {
            alert(resp.data);
        }
        else {
            localStorage.setItem('Token', resp.data);
            Navigate("/Home");
        }
        }
    }
    // setting data of form in variable
    const handlechange = (e) => {
        e.preventDefault();
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
    return (
        <>
        <div>
            <div className='loginbox'>
                <h1>Login Here</h1>
                <form>
                    <p>Email</p>
                    <input type="text" placeholder='Enter Email' name="Email" value={customer.Email} onChange={handlechange} />
                    <p>Password</p>
                    <input type="password" placeholder='Enter Password' name='Password' value={customer.Password} onChange={handlechange} />
                    <input type="submit" value="Login" onClick={handleLogin} /><br></br>
                    <Link to="/">Don't have an account?</Link>
                </form>
            </div>
        </div>
        </>
    )
}
