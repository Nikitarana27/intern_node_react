import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    

    //this is for log out it will clear the token saved in local storage
    const handleLogout = (e) =>{
        e.preventDefault();
        localStorage.setItem('Token' , "");
        navigate("/Login");
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <p className="navbar-brand m-1">Select your items...</p>
                    <form className="d-flex">
                            <Link className="btn btn-outline-success m-1" to="/Cart">My Cart</Link>
                            <Link className="btn btn-outline-success m-1" to="/Orders">My Orders</Link>
                            <Link className="btn btn-outline-success m-1" to="/Profile">My Profile</Link>
                            <button className="btn btn-outline-success m-1" onClick={handleLogout}>Logout</button>
                    </form>
                </div>
            </nav>
        </>
    )
}
