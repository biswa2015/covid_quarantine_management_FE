import React, { useEffect, useState } from "react";
import "./navbar.css";


import { NavLink } from "react-router-dom";


let isLoggedIn = false;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}




let cookie;
const Navbar = () => {

  
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  
  useEffect(() => {
    console.log("Inside Navbar")
    cookie = getCookie("admin_cookie"); 
    if(cookie!=null){
      isLoggedIn = true;
      //alert("cookie there");
    }
    else{
      isLoggedIn = false;
    }    
  });

  

  console.log(isLoggedIn);
  if(isLoggedIn){
    return (
      <>
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>C</span>ovid
              <span>Q</span>UARANTINE
            </h2>
          </div>
  
          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {/* <li>
                <NavLink to="/login-doctor">Doctor Login</NavLink>
              </li>
              <li>
                <NavLink to="/login-admin">Admin Login</NavLink>
              </li>
              <li>
                <NavLink to="/add-doctor">Add Doctor</NavLink>
              </li>
              <li>
                <NavLink to="/register-doctor">Register Doctor</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Doctor Logout</NavLink>
              </li>
              <li>
                <NavLink to="/logout-admin">Admin Logout</NavLink>
              </li>
              <li>
                <NavLink to="/granted-consents">Granted Consents</NavLink>
              </li>
              <li>
                <NavLink to="/request-consents">Request Consents</NavLink>
              </li> */}
              <li>
                <NavLink to="/add-members">Add Member</NavLink>
              </li>
              <li>
                <NavLink to="/add-rooms">Add Rooms</NavLink>
              </li>
              <li>
                <NavLink to="/add-tests">Add Test Results</NavLink>
              </li>
              <li>
                <NavLink to="/free-room">Room Allocation</NavLink>
              </li>
              <li>
                <NavLink to="/deallocate-rooms">Room Deallocation</NavLink>
              </li>
              <li>
                <NavLink to="/positive-students">Positive Students</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
              
            </ul>
          </div>
  
          
        </nav>
      </>
    );

  }
  else{
    cookie = getCookie("admin_cookie"); 
    if(cookie!=null){
      isLoggedIn = true;
      //alert("cookie there");
    }
    else{
      isLoggedIn = false;
    } 
    console.log("Inside else case");
    console.log(cookie);
    return (
      <>
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>C</span>ovid
              <span>Q</span>UARANTINE
            </h2>
          </div>
  
          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>
              {/* <li>
                <NavLink to="/">Home</NavLink>
              </li> */}
              {/* <li>
                <NavLink to="/login-doctor">Doctor Login</NavLink>
              </li>
              <li>
                <NavLink to="/login-admin">Admin Login</NavLink>
              </li>
              <li>
                <NavLink to="/add-doctor">Add Doctor</NavLink>
              </li>
              <li>
                <NavLink to="/register-doctor">Register Doctor</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Doctor Logout</NavLink>
              </li>
              <li>
                <NavLink to="/logout-admin">Admin Logout</NavLink>
              </li>
              <li>
                <NavLink to="/granted-consents">Granted Consents</NavLink>
              </li>
              <li>
                <NavLink to="/request-consents">Request Consents</NavLink>
              </li> */}
              <li>
                <NavLink to="/login-admin">Admin Login</NavLink>
              </li>
            </ul>
          </div>
  
          
        </nav>
      </>
    );
 
  }
};

export default Navbar;
