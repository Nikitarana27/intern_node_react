import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Registration.css';


export default function Login() {
  const [register, setRegister] = useState({
    Email: "",
    Password: ""
  });

  const history = useNavigate();

  //handle change setting the variables 
  const handleChange = (e) => {
    e.preventDefault();
    setRegister({ ...register, [e.target.name]: e.target.value });

  }


  //making invisible the message
  const hide = () => {
    document.getElementById("email").setAttribute("style", "visibility: hidden");
    document.getElementById("password").setAttribute("style", "visibility: hidden");
  }


  // handle login 
  const handleLogin = async (e) => {
    e.preventDefault();
    //verifing email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.Email)) {
      //varifing password
      if (register.Password === "") {
        document.getElementById("password").setAttribute("style", "visibility: visible")
        document.getElementById("password").innerHTML = "you must enter password";
        setTimeout(hide, 1000);
      }
      //if password is entered then...
      else {
        const localhost = "http://localhost:5000/Login";
        const res = await axios.post(localhost , {email : register.Email , password : register.Password });
        // console.log(res.data);
        //if email and password entered and email and password in database is not matched
        if(res.data == "invalid email.. please register yourself first"){
          alert(res.data);
          history("/");
        }
        //if invalid password
        else if(res.data == "password invalid"){
          alert(res.data);
          history("/Login");
        }
        //if email and password entered and email and password in database is matched
        else{
          //setting local storage
          localStorage.setItem('Email' , register.Email);
          localStorage.setItem('Password' , register.Password);
          localStorage.setItem('Token' , res.data);
          history("/Home");
        }
      }
    }
    //if invalid email formate
    else {
      document.getElementById("email").setAttribute("style", "visibility: visible");
      document.getElementById("email").innerHTML = "enter proper email..."
      setTimeout(hide, 1000);
    }
  }


  return (
    <div className='Register ' style={{height: "100vh"}}>


      <div style={{ display: "flex", justifyContent: "center" }} >
        <form className='w-50' style={{ margin: "10%" }}>
          <fieldset className='border p-3'>
            <legend className='text-center fw-bold text-success'>Login</legend>

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
                <span id="password" className='fs-small text-danger'></span>
              </div>
            </div>

            <div className='text-center'>
              <button className='btn btn-success m-1' onClick={handleLogin} >Login</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
