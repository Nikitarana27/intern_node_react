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
  const EditItem = async (id, Child) => {
    let text;
    let person = prompt("Please enter value you want to edit instead of " + Child,);
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      const resp = await axios.post("http://localhost:5000/UpdateData", { ID: id, CHILD: Child, PERSON: person });
      console.log(resp.data);
    }

    // console.log(text);
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
    let btn1 = document.createElement("button");
    btn1.innerHTML = "&nbsp;".repeat(count * 6) + Child + "&nbsp;&nbsp;&nbsp;";
    btn1.setAttribute("style", "border: none;background: none");
    // div1.innerHTML = "&nbsp;".repeat(count * 6) + Child + "&nbsp;&nbsp;&nbsp;";
    //create delete button
    btn1.addEventListener("click", () => handleChild(id));
    div1.appendChild(btn1)

    let btn = document.createElement("button");
    btn.setAttribute("style", "color: red");
    btn.innerHTML = "x";
    //delete child
    btn.addEventListener("click", () => deleteItem(id));
    div1.appendChild(btn);

    let btn2 = document.createElement("button");
    btn2.setAttribute("style", "color: red");
    btn2.innerHTML = "edit";
    //delete child
    btn2.addEventListener("click", () => EditItem(id, Child));
    div1.appendChild(btn2);

    //recursive call to get childern of child
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
                <div id={items.child} onDoubleClick={() => { handleChild(items.id) }}>{items.child}&nbsp;&nbsp;&nbsp;
                  <button onClick={() => deleteItem(items.id)} style={{ color: "red" }}>x</button>
                  <button onClick={() => EditItem(items.id, items.child)} style={{ color: "red" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </button>
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
