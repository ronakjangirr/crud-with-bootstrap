import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../component/About.css";

function Contact() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      let response = await axios.get("https://fakestoreapi.com/product");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Please check network connection again")
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <p>Please wait data is loading...</p>
        </div>
      ) : data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <ul key={index}>
              <li>{item.title}</li>
            </ul>
          ))}
        </>
      ) : (
        <p>No Data Available</p>
      )}
    </>
  );
}

export default Contact;
