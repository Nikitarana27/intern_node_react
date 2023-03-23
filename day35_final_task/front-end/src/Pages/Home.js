import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const history = useNavigate();
  const [user, setUser] = useState();
  const defaultFunction = async () => {
    const resp = await axios.get("http://localhost:5000/getUsers");
    setUser(resp.data);
  }

  const handleView = (id) => {
    localStorage.setItem("ID", id);
    history("/View");
  }
  const handleEdit = (id) => {
    localStorage.setItem("ID", id);
    history("/Edit");
  }
  const handleDelete = async (id) => {

  }
  useEffect(() => {
    defaultFunction();
  }, [])

  return (
    <div>
      <div><Header /></div>
      <div className='m-2'>
        <table className='table table-stripped'>
          <thead className='bg-dark text-light text-center'>
            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Photo</th>
            <th>Hobbies</th>
            <th>Status</th>
            <th>action</th>
          </thead>

          {user &&
            user.map((items) => {
              return (
                <tbody className='text-center' style={{ height: "70px", verticalAlign: "middle" }}>
                  <td>{items.code}</td>
                  <td>{items.firstname} {items.lastname}</td>
                  <td>{items.email}</td>
                  <td>{items.gender}</td>
                  <td>{items.country}</td>
                  {/* <td>{items.filename}</td> */}
                  <td><img src={'./Images/' + items.filename} style={{ height: "100px", width: "100px", borderRadius: "30px" }} /></td>
                  <td>{items.hobby}</td>
                  {items.state == "A" ? <td>Active</td> : <td>Inactive</td>}
                  <td>
                    <div>
                      <button className='btn btn-primary m-1' onClick={() => handleView(items.id)}>&#x1f441;</button>
                      <button className='btn btn-success m-1' onClick={() => handleEdit(items.id)}>&#128393;</button>
                      <button className='btn btn-danger m-1' onClick={() => handleDelete(items.id)}>&#128465;</button>
                    </div>
                  </td>
                </tbody>
              )
            })}
        </table>
      </div>
    </div>
  )
}


