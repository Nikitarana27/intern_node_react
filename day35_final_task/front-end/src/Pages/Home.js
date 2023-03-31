import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import ReactPaginate from 'react-paginate';

export default function Home() {
  const history = useNavigate();
  //this will take all users
  const [user, setUser] = useState();
  //this is filtered user
  const [user1, setUser1] = useState();

  //variable used for filter
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies1, setHobbies1] = useState("");
  const [status, setStatus] = useState("");

  //default function which gives all data
  const defaultFunction = async () => {
    const resp = await axios.get("http://localhost:5000/getUsers");
    setUser(resp.data);
    setUser1(resp.data)
  }

  //for pagination
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  var currentItems = user1 && user1.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(user1 && user1.length / itemsPerPage);

  //for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % user1.length;
    setItemOffset(newOffset);
  };

  //call view page 
  const handleView = (id) => {
    localStorage.setItem("ID", id);
    history("/View");
  }

  //call edit page
  const handleEdit = (id) => {
    localStorage.setItem("ID", id);
    history("/Edit");
  }

  //used for deleting user
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want too delete") == true) {
      await axios.post("http://localhost:5000/deleteUser", { ID: id });
      defaultFunction();
    }
  }


  //used for exporting the file 
  const handleExport = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/handleExport", { User: user1 });
    alert("your data is exported");
  }

  //used for importing the file
  const handleImport = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:5000/handleImport");
    alert("your data is Imported");
    defaultFunction();
  }

  //on click active it will make it inactive
  const handleStatus = async (id, state) => {
    await axios.post("http://localhost:5000/handleStatus", { ID: id, State: state });
    defaultFunction();
  }

  //this is for having values of hobby which will used in filter
  const handlechange = () => {
    let hobbies = []
    const hobby = document.getElementsByName('hobby');
    for (let i = 0; i < hobby.length; i++) {
      if (hobby[i].checked == true) {
        hobbies.push(hobby[i].value);
      }
    }
    setHobbies1(hobbies);
  }

  //used to call default function also it is used in multiple select dropdown
  useEffect(() => {
    defaultFunction();

    var checkList = document.getElementById('list1');
    checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
      if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
      else
        checkList.classList.add('visible');
    }
  }, [])

  //on clicking reset all the data will be reset 
  const handleReset = () => {
    document.getElementById('search').value = "";
    document.getElementById('female').checked = false;
    document.getElementById('male').checked = false;
    document.getElementById('all').checked = false;
    document.getElementsByName('hobby').value = false;
    document.getElementById('Reading').checked = false;
    document.getElementById('Travelling').checked = false;
    document.getElementById('Music').checked = false;
    document.getElementById('Cricket').checked = false;
    document.getElementById('Dancing').checked = false;
    document.getElementById('Singing').checked = false;
    document.getElementById('status')[0].checked = true;
    document.getElementById('status')[0].checked = true;
    document.getElementById('status')[0].checked = true;
    setUser1(user);

  }

  //code for filter using search
  useEffect(() => {
    let searched = [];
    if (search == "") {
      searched = user1;
    }
    else {
      for (let i = 0; i < user1.length; i++) {
        if (user1[i].name.toLowerCase().includes(search.toLowerCase())) {
          searched.push(user1[i]);
        }
      }
    }
    setUser1(searched);
  }, [search])

  //code for filter using hobbies
  useEffect(() => {
    console.log(hobbies1);
    let search = user1;
    for (let i = 0; i < hobbies1.length; i++) {
      let extra = []
      for (let j = 0; j < search.length; j++) {
        if (search[j].hobby.toLowerCase().includes(hobbies1[i].toLowerCase())) {
          extra.push(search[j]);
        }
      }
      search = extra;
    }
    setUser1(search)
  }, [hobbies1])


  //code for filter using gender
  useEffect(() => {
    let searched1 = [];
    if (gender == "") {
      searched1 = user1;
    }
    else {
      if (gender == "F" || gender == "M") {
        for (let i = 0; i < user1.length; i++) {
          if (user1[i].gender == gender) {
            searched1.push(user1[i]);
          }
        }
      }
      else {
        searched1 = user1;
      }
    }
    setUser1(searched1);
  }, [gender])


  //code for filter using status (active and inactive)
  useEffect(() => {
    if (user1) {
      console.log(status);
      let extra = [];
      for (let i = 0; i < user1.length; i++) {
        if (user1[i].state == "Y" && status == "Active") {
          extra.push(user1[i]);
        }
        else if (user1[i].state == "N" && status == "Inactive") {
          extra.push(user1[i]);
        }
      }
      setUser1(extra);
    }
  }, [status])

  return (
    <div>
      <div><Header /></div>
      <div className='m-2'>
        {/* html for filtering data */}
        <form>
          <table>
            <tr>
              <td>
                <div className='d-flex'>
                  <button className='btn btn-success' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                  <input type="text" name="search" id="search" className='form-control col-md-3' onChange={(e) => setSearch(e.target.value)}></input>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ borderRight: "1px solid", paddingLeft: "30px", paddingRight: "30px" }} >
                <div>
                  <input onChange={(e) => setGender(e.target.value)} type="radio" id="male" className='m-1' name="gender" value="M" />Male
                  <input onChange={(e) => setGender(e.target.value)} type="radio" id="female" className='m-1' name="gender" value="F" />Female
                  <input onChange={(e) => setGender(e.target.value)} type="radio" id="all" className='m-1' name="gender" value="A" />All
                </div>
              </td>
              <td style={{ borderRight: "1px solid", paddingLeft: "30px", paddingRight: "30px" }}>
                <div id="list1" class="dropdown-check-list" tabindex="100" >
                  <span class="anchor">Select hobbies</span>
                  <ul class="items" >
                    <li><input type="checkbox" id="Reading" name="hobby" onChange={handlechange} value="Reading" />Reading </li>
                    <li><input type="checkbox" id="Travelling" name="hobby" onChange={handlechange} value="Travelling" />Travelling</li>
                    <li><input type="checkbox" id="Music" name="hobby" onChange={handlechange} value="Music" />Music </li>
                    <li><input type="checkbox" id="Cricket" name="hobby" onChange={handlechange} value="Cricket" />Cricket </li>
                    <li><input type="checkbox" id="Dancing" name="hobby" onChange={handlechange} value="Dancing" />Dancing </li>
                    <li><input type="checkbox" id="Singing" name="hobby" onChange={handlechange} value="Singing" />Singing </li>
                  </ul>
                </div>
              </td>
              <td style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                <div>
                  <select id="status" name="status" onChange={(e) => { setStatus(e.target.value) }} className="form-control" >
                    <option defaultChecked value="Search by status...">Search by status...</option>
                    <option id="active" value="Active" >Active</option>
                    <option id="inactive" value="Inactive">Inactive</option>
                  </select>
                </div>
              </td>
              <td style={{ paddingLeft: "250px" }}>
                <button className='btn btn-danger' onClick={handleReset}>reset</button>
              </td>
              <td >
                <div style={{ paddingLeft: "5px" }}>
                  <button className='btn btn-success m-1' onClick={handleExport}>Export File</button>
                  <button className='btn btn-success m-1' onClick={handleImport}>Import File</button>
                </div>
              </td>
            </tr>
          </table>
        </form>
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

          {currentItems &&
            currentItems.map((items) => {
              return (
                <tbody className='text-center' style={{ height: "70px", verticalAlign: "middle" }}>
                  <td>{items.code}</td>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.gender}</td>
                  <td>{items.country}</td>
                  {/* <td>{items.filename}</td> */}
                  <td><img src={'./Images/' + items.filename} alt="😊I am not available" style={{ height: "100px", width: "100px", borderRadius: "30px" }} /></td>
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

        {/* react pagination */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeLinkClassName={'active'}
          />
        </div>

      </div>
    </div>
  )
}


