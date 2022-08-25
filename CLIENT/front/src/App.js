import React from 'react';
import "./styles.css"
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import List from './Pages/List';
import Register from './Pages/Register';
import Policy from './Pages/Policy';



function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Policy/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </div>
    </div> 
  );
}

export default App;



