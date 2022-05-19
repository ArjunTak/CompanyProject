import React, { useState, useEffect } from "react";
import {Modal, Button} from "react-bootstrap";
import axios from 'axios';
import Table from "./Table";


const HomeComponent = () => {

    const [value, setValue] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [nationality, setNationality] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [table, setTable] = useState(false);

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleAge = (e) => {
        setAge(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleNationality = (e) => {
        setNationality(e.target.value)
    }

   

// comment

    const add = (e) =>{
        e.preventDefault();

        axios.post("http://localhost:5000/api/auth/capturedetails", {name, age, phone, nationality})
        .then((response) =>{
            console.log("response", response)
            
            setError("");
        })
        .catch(error => setError(error.response.data.message));

        setTimeout(()=>{axios.get("http://localhost:5000/userdetails", {name, age, phone, nationality})
        .then(res=>{
           setData(res.data)
        }).catch(err=>{
            console.log(err)
        })}, 200);

        setValue(false);
        setTable(true);
        setName("");
        setAge("");
        setPhone("");
        setNationality("");
           
    }
   

    return(
    <div>
        <h1>Home</h1>
        <h2>Personal Details</h2>
        <br/>
        <input onChange={handleName} value={name} type="text" className="form-field" placeholder="Name" />
        <br/>
        <br/>
        <input onChange={handleAge} value={age} type="number" className="form-field" placeholder="Age" />
        <br/>
        <br/>
        <input onChange={handlePhone} value={phone} type="number" className="form-field" placeholder="Phone" />
        <br/>
        <br/>
        <input onChange={handleNationality} value={nationality} type="text" className="form-field" placeholder="Nationality" />
         <br/>
         <br/>
         <button onClick={()=>{setValue(true)}}>Submit</button> 

         

           {table && (
             <Table data={data} />
         )}

         {value && (
             <div>
                 <Modal show={value}>
                     <Modal.Header> Sure you want to Submit Details?</Modal.Header>
                     <Modal.Body> 
                         <ul>
                             <li>Name : {name}</li>
                             <li>Age : {age}</li>
                             <li>Phone: {phone}</li>
                             <li>Nationality : {nationality}</li>
                         </ul>
                     </Modal.Body>
                     <Modal.Footer>
                         <Button onClick = {add}>Submit</Button>
                         <Button onClick={()=>{setValue(false)}}>Close</Button>
                     </Modal.Footer>
                 </Modal>
             </div>
           
         )}

    </div>
    )
}

export default HomeComponent;