import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

export default function Cart() {
    const [cartData, setCartdata] = useState("");
    const [total, setTotal] = useState("");
    const history = useNavigate();
        //this will not allow user to access this page without login
    useEffect(() => {
      if(localStorage.getItem('Token')){
        history("/Cart");
      }
      else{
        history("/Login");
      }
    
  
    }, [history]);
    
    //default function
    const MyCart = async () => {
        const resp = await axios.get("http://localhost:5000/MyCart", { headers: { tkn: localStorage.getItem('Token') } });
        setCartdata(resp.data);
        // console.log(resp.data)
        let Total = 0
        for (let i = 0; i < resp.data.length; i++) {
            Total = Total + (resp.data[i].Price * resp.data[i].quantity);
        }
        setTotal(Total);
    }


    //if user want to add the same item
    const handleQuantityAdd = async(pid,quantity,cid) =>{
       await axios.post("http://localhost:5000/QuantityAdd",{Pid : pid, Quantity : quantity , Cid: cid});
       
    }
    //if user want to subtract the same item
    const handleQuantitySubtract = async(pid,quantity,cid) =>{
        await axios.post("http://localhost:5000/QuantitySubtract",{Pid : pid, Quantity : quantity , Cid: cid});
        MyCart();
     }
     //if user want to remove item
     const handleRemove = async(id) => {
        await axios.post("http://localhost:5000/handleRemove",{Id : id});
    }
    //if user submit order 
     const handleOrderSubmit = async () =>{
        // console.log(cartData);
        if(cartData == ""){
            alert("Please enter item into cart");
            history("/Home");
        }
        else{
            await axios.post("http://localhost:5000/OrderSubmit",{datas: cartData});

        }
            
     }
     useEffect(() =>{
        MyCart();
    },[handleQuantitySubtract,handleQuantityAdd,handleRemove])

    //call default function
    useEffect(()=>{
        MyCart();
    },[])
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <p className="navbar-brand m-1">My Cart...</p>
                    <form className="d-flex">
                            <Link className="btn btn-outline-success m-1" to="/Home">Home</Link>
                    </form>
                </div>
            </nav>
            <div className="m-3" style={{ fontSize: "large", borderRadius: "10px" }} >
                <table className='table table-striped' >
                    <thead>
                        <tr>
                            <td scope="col" className='bg-dark text-light'>Product Name</td>
                            <td scope="col" className='bg-dark text-light'>Brand Name</td>
                            <td scope="col" className='bg-dark text-light'>Price</td>
                            <td scope="col" className='bg-dark text-light'>Quantity</td>
                            <td scope="col" className='bg-dark text-light'>add item</td>
                            <td scope="col" className='bg-dark text-light'>Remove item</td>
                            <td scope="col" className='bg-dark text-light'>delete item</td>

                            {/* <td className='bg-dark text-light fs-bold'>Status</td>
                    <td className='bg-dark text-light fs-bold'>Add to cart</td> */}
                        </tr>
                    </thead>
                    {cartData &&

                        cartData.map((items) => {
                            return (
                                <tbody className='fw-bold'>
                                    <tr>
                                        <td>{items.pname}</td>
                                        <td>{items.brand}</td>
                                        <td>{items.Price}.00/-</td>
                                        <td>{items.quantity}</td>
                                        <td width='10%'><button className=" btn-danger btn-sm " onClick={() => handleQuantityAdd(items.pid,items.quantity,items.cid)} >+</button></td>
                                        <td width='10%'><button className=" btn-danger btn-sm " onClick={() => handleQuantitySubtract(items.pid,items.quantity,items.cid)}>-</button></td>
                                        <td width='10%'><button className=" btn-danger btn-sm " onClick={() => handleRemove(items.id)}>x</button></td>

                                        
                                    </tr>
                                </tbody>
                            )
                        })
                    }

                    <tr className='bg-dark text-light'>
                        <td>&nbsp;</td>
                        <td>Total:-</td>
                        <td>{total}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </table>
            </div>
            <div className='text-center'>
            <Link to="/Home"><button className="btn btn-dark m-1" onClick={handleOrderSubmit}>Order Submit</button></Link>
            </div>
        </div>
    )
}
