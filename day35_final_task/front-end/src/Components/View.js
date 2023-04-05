import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { QRCodeCanvas } from "qrcode.react";
//user can view profile using this component 
export default function View() {
    //for QRcode
    const[url,setUrl]=useState();

    const [userDetail, setUserDetail] = useState();
    //default function it will get user detail of perticular user using user id
    const defaultFunction = async () => {
        const resp = await axios.post("http://localhost:5000/getUser", { id: localStorage.getItem('ID') });
        // console.log(resp.data);
        setUserDetail(resp.data[0]);
        setUrl(resp.data[0].code)
    }
    const qrcode = (
            <QRCodeCanvas
              id="qrCode"
              value={"http://localhost:3000/View"+ url}
              size={200}
              bgColor={"#ffffff"}
              level={"H"}
            />
      );
    // const handleQR = () =>{
    //     var qrcode = new QRCode("qrcode",
    //     "https://www.geeksforgeeks.org");
    // }

    // this will help to run default function
    useEffect(() => {
        defaultFunction();
    }, [])


    return (
        <div>
            {userDetail &&
                <>  
                {/* navbar */}
                {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script> */}
                    <nav className="navbar navbar-dark bg-dark">
                        <div className="container-fluid ">
                            {/* showing name of perticular user in nav bar */}
                            <div className='navbar-brand m-1' style={{ verticalAlign: "middle", height: "40px" }}>
                                {userDetail.firstname} {userDetail.lastname}</div>
                            <form className="d-flex">
                                {/* <button className="btn btn-outline-success m-1" onClick={handleQR}></button> */}
                                <Link title="go to home page" className="btn btn-outline-success m-1" to="/">Home</Link>
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
                                        <th style={{ width: "300px" }}>Code</th>
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
                                        <th>Hobbies</th>
                                        <td>{userDetail.hobby}</td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td>{userDetail.country}</td>
                                    </tr>
                                    <tr>
                                        <th>Starting Date</th>
                                        <td>{userDetail.dateadded}</td>
                                    </tr>
                                    <tr>
                                        <th>Last Update</th>
                                        <td>{userDetail.dateupdated}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{userDetail.state == "Y" ? <td>Active</td> : <td>Inactive</td>}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <div style={{border: "1px solid black",width: "220px",padding: "10px"}}>{qrcode}</div>
                    </div>
                </>
            }
        </div>
    )
}


