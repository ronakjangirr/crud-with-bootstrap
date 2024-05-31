import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function GetUserData() {
  let [get, setGet] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  
  async function getData() {
    try {
      const res = await axios.get(
        "https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube"
      );
      debugger;
      console.log(res.data);
      setGet(res.data);
    } catch (error) {
      console.error(error);
    }
  }


  async function handleDelete(id) {
    try {
      await axios.delete(
        `https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube/${id}`
      );
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (id) => {
    debugger;
    navigate(`/updateuserdata/${id}`);
  };

  return (
    <>
      <div className="hello">
        <h2 className="heading-style2">List of Data Added</h2>
        <Table striped bordered hover className="bgcolor">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>

          {get.map((eachdata, index) => {
            return (
              <>
                <tbody className="bgcolor">
                  <tr>
                    <td>{index + 1}</td>
                    <td>{eachdata.name}</td>
                    <td>{eachdata.email}</td>
                    <td>{eachdata.city}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(eachdata.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      {/* <Link to="/updateuserdata"> */}
                        <Button
                          variant="outline-warning"
                          onClick={() => handleEdit(eachdata.id)}
                        >
                          Edit
                        </Button>
                      {/* </Link> */}
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
        <Button variant="dark" className="btnstyle2">
          <Link to="/">Add Data</Link>
        </Button>
      </div>
    </>
  );
}

export default GetUserData;
