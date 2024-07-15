import axios from "axios";
import "./App.css";
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from "./component/NavigationBar"; // Make sure NavigationBar is correctly imported

const Home = lazy(() => import('./component/Home'));
const About = lazy(() => import('./component/About'));
const Contact = lazy(() => import(/* webpackPrefetch:true */'./component/Contact'));
// This is the magic comment which download the file or component when app is load at first
// We can see this inside the network tab the contact file will load automatically at first render

function App() {
  return (
    <>
    <NavigationBar />  
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/about" element={<About />}  />
          <Route path="/contact" element={<Contact />}  />
        </Routes>
      </Suspense>

    </>
  );
}
export default App;
