
import './App.css';
import Login from './Components/Login'
import Home from './Components/Home'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Error from './Components/Error';
import Register from './Components/Register';
import Articles from './Components/Articles';
import Journal from './Components/Journal';
import Helpline from './Components/Helpline';
import Landing from './Components/Landing';
import Delhi from './Components/Delhi';
import Mumbai from './Components/Mumbai';
import Kolkata from './Components/Kolkata';
import Bengaluru from './Components/Bengaluru';
import Both from './Components/Both';
import Online from './Components/Online';


function App() {
  return (
    <Router>

      <Routes>

        {/* <Route exact path='/' element={<Landing />} /> */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/addjournal' element={<Journal />} />
        <Route exact path='/landing' element={<Landing />} />
        <Route exact path='/helpline' element={<Helpline />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/articles' element={<Articles />} />
        <Route exact path='/delhi' element={<Delhi />} />
        <Route exact path='/mumbai' element={<Mumbai />} />
        <Route exact path='/kolkata' element={<Kolkata />} />
        <Route exact path='/bengaluru' element={<Bengaluru />} />
        <Route exact path='/online' element={<Online />} />
        <Route exact path='/both' element={<Both />} />
        <Route exact path='/error' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
