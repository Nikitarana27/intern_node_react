import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../components/Header';

export default function Home() {
    //used to hide text bar if parent or child
    const [type, setType] = useState(false);
    //for diff values 
    const [data, setData] = useState(
        {
            cname: "",
            cselection: ""
        }
    );
    //for radio button
    const [ctype, setCtype] = useState("");
    //used for drop down if child and want to select parent
    const [parent, setParent] = useState();

    //for radio
    const handlechange = (e) => {
        if (e.target.value === "Child") {
            setType(true);
        }
        else {
            setType(false);
        }
        setCtype(e.target.value);

    }
    //for rest of values other then radio
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // console.log(data)
    }

    //default function
    const defaultFunction = async () => {
        const resp = await axios.get("http://localhost:5000/getParentForSelection");
        console.log(resp.data);
        setParent(resp.data);
    }

    //add data to database
    const handleAdd = async (e) => {
        e.preventDefault();
        if (ctype === "") {
            alert("please select one of two category type");
        }
        else if (data.cname === "" || !(/^[a-zA-Z0-9]*$/.test(data.cname))) {
            alert("please enter category properly");
            document.getElementById('cname').focus();
        }
        else {
            if (ctype === "Child") {
                if (data.cselection === "" || !(/^[a-zA-Z0-9]*$/.test(data.cselection)) || data.cselection === "choose") {
                    alert("please enter category properly");
                }
                else {
                    //if child
                    const res = await axios.post("http://localhost:5000/ChildEnter", { Cname: data.cname, Cselection: data.cselection });
                    alert(res.data);
                    setData("");
                    document.getElementById('Parent').checked = false;
                    document.getElementById('Child').checked = false;
                    alert(res.data);
                    defaultFunction();
                }
            }
            else {
                //if parent
                const res = await axios.post("http://localhost:5000/ParentEnter", { Cname: data.cname });
                alert(res.data);
                // setData("");
                document.getElementById('cname').value="";
                document.getElementById('cselection').value="";
                document.getElementById('Parent').checked = false;
                document.getElementById('Child').checked = false;
                defaultFunction();
            }
        }
    }

    useEffect(() => {
        defaultFunction();
    }, [])

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className='d-flex justify-content-center m-5'>
                <div className='w-75 '>
                    <form>

                        <fieldset class="form-group m-4">
                            <div class="row">
                                <legend class="col-form-label col-sm-2 pt-0">Category Type:</legend>

                                <div class="col-sm-10">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ctype" id="Parent" value="Parent" onChange={handlechange} />
                                        <label class="form-check-label" for="Parent">
                                            Parent
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ctype" id="Child" value="Child" onChange={handlechange} />
                                        <label class="form-check-label" for="Child">
                                            Child
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </fieldset>

                        <div class="form-group row m-4">
                            <label for="cname" class="col-sm-2 col-form-label">Category Name:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="cname" name="cname" placeholder="Category Name" value={setData.cname} onChange={handleChange} />
                            </div>
                        </div>

                        {type ?
                            <div class="form-group row m-4">
                                <label class="col-sm-2 col-form-label" for="cselection">Category Selection:</label>
                                <div class="col-sm-10">
                                    <select class="form-control" id="cselection" name="cselection" value={setData.cselection} onChange={handleChange}>
                                        <option selected value="choose">Choose...</option>
                                        {parent &&

                                            parent.map((items) => {
                                                return (
                                                    <>
                                                        <option value={items.child}>{items.child}</option>

                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>

                            : " "}

                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-primary" onClick={handleAdd}>Add</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
