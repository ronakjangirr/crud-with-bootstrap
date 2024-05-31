// import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostUserData from "./crudoperation/PostUserData";
import GetUserData from "./crudoperation/GetUserData";
import UpdateUserData from "./crudoperation/UpdateUserData";

function App() {
  return (
    <div>
      {/* <h1>Jai Banjrang Bali</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostUserData />} />
          <Route path="/getuserdata" element={<GetUserData />} />
          <Route path="/updateuserdata/:id" element={<UpdateUserData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
