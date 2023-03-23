import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <p className="navbar-brand m-1">Select your items...</p>
                    <form className="d-flex">
                        <Link className="btn btn-outline-success m-1" to="/ViewData">View Data</Link>
                        <Link className="btn btn-outline-success m-1" to="/">Home</Link>
                    </form>
                </div>
            </nav>
        </div>
    )
}
