import React from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function AddUser() {
    const history = useNavigate();

    const handleAddUser = async (event) => {
        event.preventDefault();
        //formdata will take all the name and value pair from form and store in data object including file data
        const data = new FormData(event.target);
        const res = await axios.post("http://localhost:5000/handleAddUser", data);
        if (res.data == "user added") {
            alert(res.data);
            history("/");
        }
        else {
            alert(res.data);
        }
    }

    return (
        <div>
            <div><Header /></div>
            <div className='m-4 '>
                <form onSubmit={handleAddUser} method="post">
                    {/* code */}
                    <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-8">
                            <label for="code">code</label>
                            <input type="text" className="form-control" id="code" name="code" placeholder="code should be unique" />
                        </div>
                    </div>
                    {/* firstname lastname */}
                    <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-4 m-1 ">
                            <label for="firstname">First Name</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Enter First Name" />
                        </div>
                        <div className="form-group col-md-4 m-1 ">
                            <label for="lastname">Last Name</label>
                            <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Enter Last Name" />
                        </div>
                    </div>
                    {/* email gender */}
                    <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-4 m-1">
                            <label for="email">Email</label>
                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter Email Here" />
                        </div>
                        <div className="form-group col-md-4 m-1">
                            <label for="Gender">Gender</label>
                            <div className='form-control'>
                                <input type="radio" id="male" className='m-1' name="gender" value="M" />Male
                                <input type="radio" id="female" className='m-1' name="gender" value="F" />Female
                            </div>
                        </div>
                    </div>
                    {/* country upload photo */}
                    <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-4 m-1">
                            <label for="country">Country</label>
                            <select id="country" name="country" className="form-control">
                                <option defaultChecked >Choose Your Country...</option>
                                <option name="country" value="India" >India</option>
                                <option name="country" value="USA">USA</option>
                                <option name="country" value="China" >China</option>
                                <option name="country" value="South Africa" >South Africa</option>
                                <option name="country" value="Africa" >Africa</option>
                                <option name="country" value="Canada" >Canada</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4 m-1">
                            <label for="img"> Upload Photo</label>
                            <input type="file" className='form-control' id="img" name="img" />
                        </div>
                    </div>
                    {/* hobbies */}
                    <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-8">
                            <label for="hobbies">Hobbies</label>
                            <div className='form-control'>
                                <input type="checkbox" className='m-2' name="hobby" id="Reading" value="Reading" />Reading
                                <input type="checkbox" className='m-2' name="hobby" id="Travelling" value="Travelling" />Travelling
                                <input type="checkbox" className='m-2' name="hobby" id="Music" value="Music" />Music
                                <input type="checkbox" className='m-2' name="hobby" id="Cricket" value="Cricket" />Cricket
                                <input type="checkbox" className='m-2' name="hobby" id="Dancing" value="Dancing" />Dancing
                                <input type="checkbox" className='m-2' name="hobby" id="Singing" value="Singing" />Singing
                            </div>
                        </div>
                    </div>
                    <div className="form-row d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary m-4" >Add User</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
