import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'



export default function ViewData() {

  const [data, setData] = useState("");
  var count = 0;


  //get all root parents
  const handlebreadcrumb = async (e) => {
    const resp = await axios.get("http://localhost:5000/getRootParent");
    setData(resp.data);

  }

  //code to print child
  const handleChild = async (id) => {
    count++;
    const response = await axios.post("http://localhost:5000/GetData", { Id: id });
    for (var i = 0; i < response.data.result.length; i++) {
      createDiv(response.data.result[i].child, response.data.result1[0].child, response.data.result[i].id);
    }
  }
  const createDiv = (Child, Parent, id) => {
    //create child div
    let div1 = document.createElement("div");
    div1.setAttribute("id", Child);
    div1.innerHTML = "&nbsp;".repeat(count * 6) + Child + "&nbsp;&nbsp;&nbsp;";
    //create delete button
    let btn = document.createElement("button");
    btn.setAttribute("style", "color: red");
    btn.innerHTML = "x";
    //delete child
    btn.addEventListener("click", () => deleteItem(id));
    div1.appendChild(btn);
    //recursive call to get childern of child
    div1.addEventListener("dblclick", () => handleChild(id));
    //append data of child after its parent div
    const node = document.getElementById(Parent)
    node.parentNode.insertBefore(div1, node.nextSibling);
  }

  //delete item
  const deleteItem = async (id) => {
    await axios.post("http://localhost:5000/deleteitem", { child_id: id });
  }


  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div>
        <nav aria-label="breadcrumb" className='m-5'>
          <ol className="breadcrumb" id="ol" >
            <li className="breadcrumb-item" onClick={handlebreadcrumb}>Root Node</li>
          </ol>
          <div id='div' style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            {data ? data.map((items) => {
              return (
                <div id={items.child} onDoubleClick={() => { handleChild(items.id) }}>{items.child}&nbsp;&nbsp;&nbsp;<button onClick={() => deleteItem(items.id)} style={{ color: "red" }}>x</button>
                </div>
              )
            })
              : ""
            }
          </div>
        </nav>
      </div>
    </div>
  )
}
