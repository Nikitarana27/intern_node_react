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

  const handleExport = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/handleExport", { User: user });
    alert("your data is exported");

  }

  const handleImport = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:5000/handleImport");
    alert("your data is Imported");
    defaultFunction();
  }

  const handleDelete = async (id) => {
    await axios.post("http://localhost:5000/deleteUser", { ID: id });
    defaultFunction();
  }

  const handleStatus = async (id, state) => {
    await axios.post("http://localhost:5000/handleStatus", { ID: id, State: state });
    defaultFunction();
  }

  useEffect(() => {
    defaultFunction();
  }, [])


  return (
    <div>
      <div><Header /></div>
      <div className='m-2'>
        <table>
          <tr>
            <td>
              <div className='d-flex'>
                <button className='btn btn-success'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
                <input type="text" name="search" id="search" className='form-control col-md-3'></input>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ borderRight: "1px solid" ,paddingLeft: "30px", paddingRight: "30px"}}>
              <div>
                <input type="radio" id="male" className='m-1' name="gender" value="M" />Male
                <input type="radio" id="female" className='m-1' name="gender" value="F" />Female
                <input type="radio" id="all" className='m-1' name="gender" value="A" />All
              </div>
            </td>
            <td style={{ borderRight: "1px solid",paddingLeft: "30px" , paddingRight: "30px"}}>
              <div>
                <select id="hobby" name="hobby" className="form-control">
                  <option defaultChecked >Choose Your Hobbies...</option>
                  <option name="Reading" value="Reading" >Reading</option>
                  <option name="Travelling" value="Travelling">Travelling</option>
                  <option name="Music" value="Music" >Music</option>
                  <option name="Cricket" value="Cricket" >Cricket</option>
                  <option name="Dancing" value="Dancing" >Dancing</option>
                  <option name="Singing" value="Singing" >Singing</option>
                </select>
              </div>
            </td>
            <td style={{paddingLeft: "50px" , paddingRight: "50px"}}>
              <div>
              <select id="hobby" name="hobby" className="form-control">
              <option defaultChecked >Status...</option>
              <option name="Active" value="Active" >Active</option>
                  <option name="Inactive" value="Inactive">Inactive</option>
              </select>
              </div>
            </td>
            <td style={{paddingLeft: "350px" }}>
              <button className='btn btn-danger'>reset</button>
            </td>
            <td >
              <div style={{paddingLeft: "5px" }}>
                <button className='btn btn-success m-1' onClick={handleExport}>Export File</button>
                <button className='btn btn-success m-1' onClick={handleImport}>Import File</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
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
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.gender}</td>
                  <td>{items.country}</td>
                  {/* <td>{items.filename}</td> */}
                  <td><img src={'./Images/' + items.filename} style={{ height: "100px", width: "100px", borderRadius: "30px" }} /></td>
                  <td>{items.hobby}</td>
                  {items.state == "Y" ?
                    <td>
                      <button style={{ border: "none" }} onClick={() => handleStatus(items.id, items.state)}>Active</button>
                    </td>
                    :
                    <td>
                      <button style={{ border: "none" }} onClick={() => handleStatus(items.id, items.state)}>Inactive</button>
                    </td>
                  }
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


