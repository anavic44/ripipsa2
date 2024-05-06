import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register.js';
import ARComponents from './components/ARComponents';
import { Projects2 } from './components/Project2.js';
import { deflate } from 'three/examples/jsm/libs/fflate.module.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { NavBar } from './components/NavBar.js';
import { NavBar2 } from './components/NavBar2.js';
import { RegistrarProyecto } from './components/RegistrarProyecto.js';



function App() {
  const [userId, setUserId] = useState(null);

  // Handle userId state setting after login
  const handleLoginSuccess = (userId) => {
    setUserId(userId);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path = '/' element = {<Login/>}></Route> */}
        <Route path='/' element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path = '/register' element = {<Register/>}></Route>
        <Route path = '/navbar' element = {<NavBar/>}></Route>
        {/* <Route path = '/projects' element = {<Projects2/>}></Route> */}
        <Route path="/ar" element={<ARComponents />}></Route>
        <Route path="/ar/:id_objeto" element={<ARComponents />}></Route>
        <Route path='/projects/:userId' element={<Projects2 />} />
        <Route path='/registrar-proyecto/:userId' element={<RegistrarProyecto />} />
        <Route path="/api/notas/:id_objeto" element={<NotasPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

