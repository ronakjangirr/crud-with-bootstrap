import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateUserData() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        city: ''
      });
    
    const { id } = useParams();
    console.log("ID:", id); 

    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube/${id}`);
            setUser(res.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, [id]);

    // ======== Using fetch method ============//  
    
    //   useEffect(()=>{
    //     const fetchData = async () => {
    //         try {
    //           const response = await fetch(`https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube/${id}`);
    //           if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //           }
    //           const data = await response.json();
    //           setUser(data);
    //         } catch (error) {
    //           console.error("Error fetching data:", error);
    //         }
    //       };
    //       fetchData();
    //   },[id]);

    // ======== Using fetch method ============//  

      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };    

    async function handleUpdate(e){
        e.preventDefault();
        try {
            await axios.put(`https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube/${id}`, {
                name: user.name,
                email: user.email,
                city: user.city
            });
            navigate("/getuserdata");
          } catch (error) {
            console.error("Error updating data:", error);
          }
    } 
    return (
        <>            
            <div className='hello'>
            <h2 className='heading-style3'>Update Data</h2>
                <Form className='div-style1' onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label className='lable'>Full Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Change Name" 
                        value={user.name}
                        onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='lable'>Email Address</Form.Label>
                        <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Change Email" 
                        value={user.email} 
                        onChange={handleChange} 
                        required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='lable'>City</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="city" 
                        placeholder="Change City" 
                        value={user.city} 
                        onChange={handleChange} 
                        required/>
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">Submit</Button>
                    <Button className="btnstyle1" variant="dark"><Link to="/getuserdata">Back</Link></Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateUserData;