import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {Link , useNavigate} from 'react-router-dom';

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState(true);

  // const [token, setToken] = useState();
      //this will not allow user to access this page without login
  const history = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('Token')){
      history("/Profile");
    }
    else{
      history("/Login");
    }
  

  }, [history]);

//this function will help to load profile details
  const load = async () => {
    if (profile === true) {
      const value = localStorage.getItem('Token');
      // console.log(value);
      //this api will give products detail
      const localhost = "http://localhost:5000/Profile"
      const resp = await axios.get(localhost, { headers: { tkn: value } });
      // console.log(localStorage.getItem('Token'));
      console.log(resp.data[0]);
      setFirstname(resp.data[0].Firstname);
      setLastname(resp.data[0].Lastname)
      setEmail(resp.data[0].Email)
      setMobile(resp.data[0].Mobile)
      setPasswords(resp.data[0].passwords)
      setGender(resp.data[0].Gender)
      setDOB(resp.data[0].Dob)
      setAddress(resp.data[0].Address)
    }
  }
  
 //this function will help to navigate edit profile from profile page
  const handleEdit = (e) => {
    e.preventDefault();
    setProfile(false);
    setEdit(true);
  }


  //this will help to edit information of the user from profile page
  const handleedit = async (e) => {
    e.preventDefault();
    const localhost = "http://localhost:5000/edit";
    await axios.post(localhost, { firstname: firstname, Lastname: lastname, Email: email, Password: passwords, Mobile: mobile, DOB: dob, Address: address, Gender: gender });
    // console.log(resp);
    setProfile(true);
    setEdit(false);
  }


  //if user is in edit profile page and don't want to edit information then to cancel process this function is used
  const handleCancel = (e) => {
    e.preventDefault();
    setEdit(false);
    setProfile(true);
  }

  return (
    <div onMouseEnter={load}>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <p className="navbar-brand m-1">Profile</p>
          <form className="d-flex">
            <button className="btn btn-outline-success m-1" onClick={handleEdit}>Edit</button>
            <Link className="btn btn-outline-success m-1" to="/Home">Home</Link>

          </form>
        </div>
      </nav>
      {profile ?
        <div className="d-flex justify-content-center " style={{ flexDirection: "vertical" }} >
          <div className="d-flex justify-content-center border pt-5 pb-5 bg-light m-4" style={{ fontSize: "large", width: "50%", borderRadius: "10px" }} >
            <table >
              <tr>
                <th>Firstname</th>
                <td>:</td>
                <td className='p-1'>{firstname}</td>
              </tr>
              <tr>
                <th>Lastname</th>
                <td>:</td>
                <td className='p-1'>{lastname}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>:</td>
                <td className='p-1'>{email}</td>
              </tr>
              <tr>
                <th>Passwords</th>
                <td>:</td>
                <td className='p-1'>{passwords}</td>
              </tr>
              <tr>
                <th>Mobile Number</th>
                <td>:</td>
                <td className='p-1'>{mobile}</td>
              </tr>
              <tr>
                <th>gender</th>
                <td>:</td>
                <td className='p-1'>{gender}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>:</td>
                <td className='p-1'>{dob}</td>
              </tr>
              <tr>
                <th>address</th>
                <td>:</td>
                <td className='p-1'>{address}</td>
              </tr>
            </table>
          </div>
        </div>
        : ""}

      {edit ?
        <div className="border m-4 bg-light" style={{ borderRadius: "10px" }}>
          <Form className="" style={{ margin: "5rem" }}>
            <div className='d-flex '>
              <Form.Group className="col-sm-6 mb-3 p-1" controlId="formFname">
                <label for="firstname" className="form-label fw-bold">First Name</label>
                <Form.Control type="text" placeholder="Enter first name" required name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} ></Form.Control>
              </Form.Group>

              <Form.Group className="col-sm-6 mb-3 p-1" controlId="formLname">
                <label for="lastname" className="form-label fw-bold" >Last Name</label>
                <Form.Control type="text" placeholder="Enter last name" name="lastname" required value={lastname} onChange={(e) => setLastname(e.target.value)}></Form.Control>
              </Form.Group>
            </div>
            <div className='d-flex '>
              <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                <label for="email" className="form-label fw-bold">Email</label>
                <Form.Control type="text" placeholder="Enter email" name="email" disabled value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group className="col-sm-6 mb-3 p-1" controlId="formEmail">
                <label for="passwords" className="form-label fw-bold">Password</label>
                <Form.Control type="text" placeholder="Enter email" name="passwords" required value={passwords} onChange={(e) => setPasswords(e.target.value)}></Form.Control>
              </Form.Group>
            </div>
            <div className='d-flex '>
              <Form.Group className="col-sm-6 mb-3 p-1" controlId="formPhone">
                <label for="mobile" className="form-label fw-bold">MobileNumber</label>
                <Form.Control type="tel" placeholder="Enter phone number" required name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group className="col-sm-6 mb-3 " controlId="formGender" >
                <label for="gender" className="form-label fw-bold">Gender &nbsp;</label><br></br>
                <div className="border rounded p-2 bg-light">
                  <input type="radio" value="male" id="male" name="gender" placeholder="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)}></input>
                  <label class="form-check-label" for="male">Male</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" id="female" value="female" name="gender" placeholder="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)}></input>
                  <label class="form-check-label" for="female">Female</label>
                </div>
              </Form.Group>
            </div>
            <div className='d-flex '>
              <Form.Group className="col-sm-6 mb-3 p-1" controlId="formAbout">
                <label for="address" className="form-label fw-bold">Address</label>
                <Form.Control type="text" placeholder="Enter about" name="address" required value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group className="col-sm-6 mb-3 " controlId="formGender" >
                <label for="dob" className="form-label fw-bold">Date of Birth &nbsp;</label><br></br>
                <div className="border rounded p-2 bg-light">
                  <input type="date" id="dob" value={dob} name="dob" onChange={(e) => setDOB(e.target.value)}></input>
                </div>
              </Form.Group>
            </div>
            <div className='text-center'>
              <button className='btn btn-success m-1' onClick={handleedit}>Edit</button>
              <button className='btn btn-danger m-1' onClick={handleCancel}>Cancel</button>
            </div>
          </Form>
        </div>
        : ""}
    </div>
  )
}
