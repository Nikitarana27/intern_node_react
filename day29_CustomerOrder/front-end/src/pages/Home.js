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
    // setSearch1(e.target.value);
    // console.log("hello");
    // e.preventDefault();
    if (products) {
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

  useEffect(() => {
    handlesearch()
  }, [search1])

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
            <label className='p-2 btn btn-primary border-dark' style={{ borderRadius: "10px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg></label>&nbsp;
            <input type="text" className='form-control w-25' onChange={(e) => { setSearch1(e.target.value) }} value={search1}></input>
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
                      <td><span style={{color: "black"}}>{items.PName}</span></td>
                      <td><span style={{color: "black"}}>{items.Brand}</span></td>
                      <td><span style={{color: "black"}}>{items.Price}</span></td>
                      {items.Status_ === "active" ? <td><span style={{color: "black"}}>{items.Status_}</span></td> : <td><span style={{color: "red"}}>{items.Status_}</span></td>}
                      
                      <td><button className=" btn-success btn-sm " onClick={() => handleAdd(items.id, items.Status_)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                        </svg></button></td>

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



