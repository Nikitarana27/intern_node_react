import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function View() {
    const [userDetail, setUserDetail] = useState();
    const defaultFunction = async () => {
        const resp = await axios.post("http://localhost:5000/getUser", { id: localStorage.getItem('ID') });
        // console.log(resp.data);
        setUserDetail(resp.data[0]);
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
                        <Link className="btn btn-outline-success m-1" to="/">Home</Link>
                    </form>
                </div>
            </nav>

            <div>
                <div className='d-flex justify-content-center m-5'>
                <table class="table table-sm w-50" >
                    <tbody>
                        <tr>
                        <td colSpan="2" className='text-center'><img src={'./Images/' + userDetail.filename} style={{ height: "100px", width: "100px", borderRadius: "30px" }} /></td>
                        </tr>
                        <tr>
                            <th style={{width: "300px"}}>Code</th>
                            <td>{userDetail.code}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{userDetail.firstname} {userDetail.lastname}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{userDetail.email}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{userDetail.gender == "M" ? <td>Male</td> : <td>Female</td>}</td>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <td>{userDetail.country}</td>
                        </tr>
                        <tr>
                            <th>Hobbies</th>
                            <td>{userDetail.hobby}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{userDetail.state == "A" ? <td>Active</td> : <td>Inactive</td>}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </>
             }
        </div>
    )
}
