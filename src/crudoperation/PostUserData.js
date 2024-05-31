import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Crudopstyle.css";

function PostUserData() {
  const [user, setUser]= useState({
    name: '',
    email: '',
    city: ''
  })

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]: e.target.value})
  }
  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  function validate() {
    let errors = {};

    if (!user.name) {
      errors.name = "Name is required";
    } else if (user.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      errors.email = "Email is not valid";
    }

    if (!user.city) {
      errors.city = "City is required";
    } else if (user.city.length < 2) {
      errors.city = "City must be at least 2 characters long";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      try{
        const res = await axios.post("https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube", {
          name: user.name,
          email: user.email,
          city: user.city,
        });
        debugger
        console.log("Posting", res);
        navigate("/getuserdata");
      }catch(error){
        console.error(error);
      }  


//====== Through fetch method ========//
      // const res = await fetch("https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     name: user.name,
      //     email: user.email,
      //     city: user.city
      //   })
      // });
      // const data = await res.json();
      // console.log("Posting", data);
      // navigate("/getuserdata");
//====== Through fetch method ========//

    }
  }

  return (
    <>
      <div className="div-style">
        <h2 className="heading-style">Post Data</h2>
        <Form className="div-style1" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="lable">Full Name</Form.Label>
            <Form.Control
              // required
              type="text"
              placeholder="Enter Full Name"
              name="name"
              value={user.name}

              // onChange={(e) => setName(e.target.value)}
              onChange={handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="lable">Email Address</Form.Label>
            <Form.Control
              // required
              type="email"
              placeholder="Enter Email"
              name="email"
              value={user.email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
            />
             {errors.email && <div className="error">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="lable">City</Form.Label>
            <Form.Control
              // required
              type="text"
              placeholder="Enter City"
              name="city"
              value={user.city}

              // onChange={(e) => setCity(e.target.value)}
              onChange={handleChange}
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </Form.Group>
          <Button
            className="btnstyle"
            variant="outline-dark"
            type="submit"
          >
            Submit
          </Button>
          <Button className="btnstyle1" variant="dark">
            <Link to="/getuserdata">Show Data</Link>
          </Button>
        </Form>
      </div>
    </>
  );
}

export default PostUserData;
