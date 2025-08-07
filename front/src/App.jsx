import React, { useContext, useEffect } from 'react'
import "./App.css"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import Appointment from './pages/Appointment';
import Login from "./pages/Login"
import Register from "./pages/Register"
import AboutUs from "./pages/AboutUs"
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './main';
import axios from 'axios';
import Footer from './pages/Footer';

const App = () => {
  const {isAuthenticated, setIsAuthenticated,setUser}=useContext(Context);

  useEffect(()=>{
    const fecthUser=async ()=>{
      try{
        const response=await axios.get("http://localhost:4000/api/v1/user/patient/me",{withCredentials:true}

        )
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
      catch(err){
        setIsAuthenticated(false);
        setUser({});
        console.log(err)
      }
    };
    fecthUser();
  },[isAuthenticated]);


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/about' element={<AboutUs/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position='top-center'/>

      </Router>
    </>
  )
}

export default App