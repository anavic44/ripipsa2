import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register.js';
import ARComponents from './components/ARComponents';
import { Projects2 } from './components/Project2.js';
import { deflate } from 'three/examples/jsm/libs/fflate.module.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { NavBar } from './components/NavBar.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Login/>}></Route>
        <Route path = '/register' element = {<Register/>}></Route>
        <Route path = '/navbar' element = {<NavBar/>}></Route>
        <Route path = '/projects' element = {<Projects2/>}></Route>
        <Route path="/ar" element={<ARComponents />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

