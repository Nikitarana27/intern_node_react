import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Orders() {
    const [orders, setOrders] = useState("");
    const [singleOrder, setSingleOrder] = useState("");
    const [orderStatus, setOrderStatus] = useState(true);
    const [singleOrderStatus, setSingleOrderStatus] = useState(false);
    const [total, setTotal] = useState("");
    const history = useNavigate();

    //this will not allow user to access this page without login
    useEffect(() => {
        if (localStorage.getItem('Token')) {
            history("/Orders");
        }
        else {
            history("/Login");
        }
    }, [history]);

    //default function
    const handleMouseEnter = async () => {
        const resp = await axios.get("http://localhost:5000/Orders", { headers: { tkn: localStorage.getItem('Token') } })
        // console.log(resp.data);
        setOrders(resp.data);
    }

    //if user wants to view details of particular order  
    const handleorder = async (id) => {
        const resp = await axios.post("http://localhost:5000/SingleOrder", { ID: id });
        setSingleOrder(resp.data)
        // console.log(resp.data);
        let sum = 0
        for (let i = 0; i < resp.data.length; i++) {
            sum = sum + (resp.data[i].Product_price * resp.data[i].product_quantity);
        }
        setTotal(sum);
        setOrderStatus(false);
        setSingleOrderStatus(true);
    }

    //if user has viewd the information and want to go back to order page
    const handleGoBack = () => {
        setOrderStatus(true);
        setSingleOrderStatus(false);
    }

    //on entering this page the first thing to perform is this function
    useEffect(() => {
        handleMouseEnter();
    }, [])

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <p className="navbar-brand m-1">My Orders...</p>
                    <form className="d-flex">
                        <Link className="btn btn-outline-success m-1" to="/Home">Home</Link>
                    </form>
                </div>
            </nav>
            <div>

                {orderStatus ?
                    <div className="m-3" style={{ fontSize: "large", borderRadius: "10px" }} >
                        <table className='table table-striped' >
                            <thead>
                                <tr>
                                    <td className='bg-dark text-light'>Order Id</td>
                                    <td className='bg-dark text-light'>Order Date</td>
                                    <td className='bg-dark text-light'>view items</td>
                                </tr>
                            </thead>
                            {orders &&

                                orders.map((items) => {
                                    return (
                                        <tbody className='fw-bold'>
                                            <tr>
                                                <td>{items.order_id}</td>
                                                <td>{items.Data_of_order}</td>
                                                <td width='10%'><button className=" btn-primary btn-sm " onClick={() => handleorder(items.order_id)} >view</button></td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                    </div>
                    : ""}

                {singleOrderStatus ?
                    <div className='d-flex justify-content-center' style={{ flexDirection: "column" }}>
                        <div className="m-4" style={{ fontSize: "large", borderRadius: "10px" }} >
                        <div>Order ID: {singleOrder[0].order_id}</div>
                        <div>Order Data: {singleOrder[0].Data_of_order}</div>
                            <table className='table table-striped' >
                                <thead>
                                    <tr>
                                        <td className='bg-dark text-light'>Product Id</td>
                                        <td className='bg-dark text-light'>Product Name</td>
                                        <td className='bg-dark text-light'>Product Price</td>
                                        <td className='bg-dark text-light'>Product Quantity</td>
                                    </tr>
                                </thead>
                                {singleOrder &&

                                    singleOrder.map((items) => {
                                        return (
                                            <tbody className='fw-bold'>
                                                <tr>
                                                    <td>{items.product_id}</td>
                                                    <td>{items.pname}</td>
                                                    <td>{items.Product_price}</td>
                                                    <td>{items.product_quantity}</td>
                                                </tr>
                                            </tbody>

                                        )
                                    })
                                }
                                <tr className='bg-dark text-light'>
                                    <td></td>
                                    <td>Total Price</td>
                                    <td>{total}</td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div className=' text-center'>
                            <Link to="/Orders" className="btn btn-dark m-1" onClick={handleGoBack}>Go Back</Link>
                        </div>
                    </div>
                    : ""}

            </div>
        </div>
    )
}
