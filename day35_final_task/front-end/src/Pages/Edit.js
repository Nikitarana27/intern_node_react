import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export default function Edit() {
    const history = useNavigate();
    const [userDetail, setUserDetail] = useState();
    const defaultFunction = async () => {
        const resp = await axios.post("http://localhost:5000/getUser", { id: localStorage.getItem('ID') });
        // console.log(resp.data);
        setUserDetail(resp.data[0]);
    }

    const handleAddUser = async (event) => {
        event.preventDefault();
        // const form = event.target;
        const data = new FormData(event.target);
        console.log(data);
        const res = await axios.post("http://localhost:5000/handleAddUser", data);
        if (res.data == "user added") {
            alert(res.data);
            history("/");
        }
        else {
            alert(res.data);
        }
    }

    useEffect(() => {
        defaultFunction();
    }, [])


    return (
        <div>
            {userDetail &&
                <>
                    <nav className="navbar navbar-dark bg-dark">
                        <div className="container-fluid ">
                            {/* <p className="navbar-brand m-1">User Management...</p> */}

                            <div className='navbar-brand m-1' style={{ verticalAlign: "middle", height: "40px" }}>
                                {userDetail.firstname} {userDetail.lastname}</div>

                            <form className="d-flex">
                                <Link className="btn btn-outline-success m-1" to="/">View Users</Link>
                            </form>
                        </div>
                    </nav>

                    <div>
                        <div className='m-4 '>
                            <form onSubmit={handleAddUser} method="post">
                                {/* code */}
                                <div className="form-row d-flex justify-content-center">
                                    <div className="form-group col-md-8">
                                        <label for="code">code</label>
                                        <input type="text" className="form-control" id="code" name="code" value={userDetail.code} placeholder="code should be unique" />
                                    </div>
                                </div>
                                {/* firstname lastname */}
                                <div className="form-row d-flex justify-content-center">
                                    <div className="form-group col-md-4 m-1 ">
                                        <label for="firstname">First Name</label>
                                        <input type="text" className="form-control" id="firstname" name="firstname" value={userDetail.firstname} placeholder="Enter First Name" />
                                    </div>
                                    <div className="form-group col-md-4 m-1 ">
                                        <label for="lastname">Last Name</label>
                                        <input type="text" className="form-control" id="lastname" name="lastname" value={userDetail.lastname} placeholder="Enter Last Name" />
                                    </div>
                                </div>
                                {/* email gender */}
                                <div className="form-row d-flex justify-content-center">
                                    <div className="form-group col-md-4 m-1">
                                        <label for="email">Email</label>
                                        <input type="text" className="form-control" name="email" id="email" value={userDetail.email} placeholder="Enter Email Here" />
                                    </div>
                                    <div className="form-group col-md-4 m-1">
                                        <label for="Gender">Gender</label>
                                        <div className='form-control'>
                                            <input type="radio" id="male" className='m-1' defaultChecked={userDetail.gender === "M"} name="gender" value="M" />Male
                                            <input type="radio" id="female" className='m-1' defaultChecked={userDetail.gender === "F"} name="gender" value="F" />Female
                                        </div>
                                    </div>
                                </div>
                                {/* country upload photo */}
                                <div className="form-row d-flex justify-content-center">
                                    <div className="form-group col-md-4 m-1">
                                        <label for="country">Country</label>
                                        <select id="country" name="country" defaultValue={userDetail.country} className="form-control">
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
                                        <input type="file" className='form-control' id="img" name="img" file={'./Images/' + userDetail.filename}/>
                                    </div>
                                </div>
                                {/* hobbies */}
                                <div className="form-row d-flex justify-content-center">
                                    <div className="form-group col-md-8">
                                        <label for="hobbies">Hobbies</label>
                                        <div className='form-control'>
                                            <input type="checkbox" defaultChecked={userDetail.hobby.includes("Reading")} className='m-2' name="hobby" id="Reading" value="Reading" />Reading
                                            <input type="checkbox" defaultChecked={userDetail.hobby.includes("Travelling")} className='m-2' name="hobby" id="Travelling" value="Travelling" />Travelling
                                            <input type="checkbox" defaultChecked={userDetail.hobby.includes("Music")} className='m-2' name="hobby" id="Music" value="Music" />Music
                                            <input type="checkbox" defaultChecked={userDetail.hobby.includes("Cricket")} className='m-2' name="hobby" id="Cricket" value="Cricket" />Cricket
                                            <input type="checkbox" defaultChecked={userDetail.hobby.includes("Dancing")} className='m-2' name="hobby" id="Dancing" value="Dancing" />Dancing
                                            <input type="checkbox" defaultChecked={userDetail.hobby.includes("Singing")} className='m-2' name="hobby" id="Singing" value="Singing" />Singing
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary m-4" >Add User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
