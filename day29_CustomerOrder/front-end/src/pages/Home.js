import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../css/Home.css';

export default function Home() {
  const [products, setProducts] = useState();
  const [search, setSearch] = useState();
  const [search1, setSearch1] = useState();
  const history = useNavigate();

  //this will not allow user to access this page without login
  useEffect(() => {
    if (localStorage.getItem('Token')) {
      history("/Home");
    }
    else {
      history("/Login");
    }
  }, []);

  //default function get product details
  const handleProducts = async () => {
    const localhost = "http://localhost:5000/Products";
    const resp = await axios.get(localhost);
    setProducts(resp.data);
    setSearch(resp.data);
  }

  const handlesearch = (e) => {
    setSearch1(e.target.value);
    // console.log("hello");
    if (search1 === "") { setSearch(products) }
    else {
      const emp = []
      for (var i = 0; i < products.length; i++) {
        if (products[i].PName.toLowerCase().includes(search1.toLowerCase())) {
          emp.push(products[i]);
        }
      }
      // console.log(emp);
      setSearch(emp)
    }
  }
  // this function will handle add item 
  const handleAdd = async (id, Status) => {
    if (Status == 'active') {
      const res = await axios.post("http://localhost:5000/customer_product", { headers: { tkn: localStorage.getItem('Token') }, Id: id })

    }
    else {
      alert("you can't add to cart because item is not available");
    }
  }


  //will call default function
  useEffect(() => {
    handleProducts();
  }, [])

  return (
    <>
      <div >
        <div><Header /></div>
        <form className='form'>
          <div className='fw-bolder d-flex p-4'>
            <label className='p-2 btn btn-success border-primary' onClick={handlesearch}>Search Here: </label>&nbsp;
            <input type="text" className='form-control w-25' onChange={handlesearch}  value={search1}></input>
          </div>
        </form>
        <div className="m-3" style={{ fontSize: "large", borderRadius: "10px" }} >
          <table className='table table-striped '>
            <thead>
              <tr >
                <td scope="col" className='bg-dark text-light'>Product Name</td>
                <td scope="col" className='bg-dark text-light'>Brand Name</td>
                <td scope="col" className='bg-dark text-light'>Price</td>
                <td scope="col" className='bg-dark text-light'>Status</td>
                <td scope="col" className='bg-dark text-light'>Add to cart</td>

              </tr>
            </thead>
            {search &&

              search.map((items) => {
                return (
                  <tbody className='fw-bold '>
                    <tr>
                      <td>{items.PName}</td>
                      <td>{items.Brand}</td>
                      <td>{items.Price}</td>
                      <td>{items.Status_}</td>
                      <td><button className=" btn-primary btn-sm " onClick={() => handleAdd(items.id, items.Status_)}>Add</button></td>

                    </tr>
                  </tbody>
                )
              })
            }
          </table>
        </div>




      </div>
    </>

  )
}



