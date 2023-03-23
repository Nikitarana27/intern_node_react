import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Home.css'


export default function Home() {
    // const [email , setEmail] = useState();
    // const [password , setPassword] = useState();
    const [token, setToken] = useState();
    const history = useNavigate();
    useEffect(() => {
        // setEmail(localStorage.getItem('Email'));
        // setPassword(localStorage.getItem('Password'));
        setToken(localStorage.getItem('Token'));

    }, []);


    //navigate to login page if not have token
    if(token){
        history("/Home");
    }
    else{
        history("/Login");
    }
    // console.log("hello" , token)



    const getProfile = async (e) => {
        e.preventDefault();
        const localhost = "http://localhost:5000/profile";
        const resp = await axios.get(localhost, {headers: { tkn: token}});
        // console.log(resp.data);
        document.getElementById("FirstName").innerHTML = resp.data[0].First_name;
        document.getElementById("LastName").innerHTML = resp.data[0].Last_name;
        document.getElementById("Email").innerHTML = resp.data[0].Email;
        
    }

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.setItem('Email' , "");
        localStorage.setItem('Password' , "");
        localStorage.setItem('Token' , "");
        history("/Login");
    }

    return (
        <div className='Home'>
            <nav className="navbar navbar-dark bg-dark">
                {/* <a class="navbar-brand" ></a> */}
                <div className="navbar-brand m-2 fw-bold">your Profile</div>
                <button onClick={getProfile} className="btn btn-success float-right">get Profile</button> 
                <button onClick={handleLogOut} className="btn btn-danger float-right">Log out</button> 

            </nav>
          
        <div className =' fs-large d-flex justify-content-center' style={{margin: "6%"}}>
            <table className='border-none'>
                <tr>
                    <th className='text p-1'>First Name:</th>
                    <td id="FirstName" className='p-1'></td>
                </tr>
                <tr>
                    <th className='text p-1'>Last Name:</th>
                    <td id="LastName" className='p-1' ></td>
                </tr>
                <tr>
                    <th className='text p-1'>Email:</th>
                    <td id="Email" className='p-1'></td>
                </tr>
            </table>
        </div>
            
        </div>
    )
}


