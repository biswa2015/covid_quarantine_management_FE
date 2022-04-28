//import React from "react";
import React, { useState,useEffect,useRef } from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import AdminLoginPage from './components/adminLogin';
import AddRoomsPage from './components/addRooms';
import AddTestResultPage from './components/addTestResult';
import FreeRoomsPage from './components/freeRoom';
import AllocateRoomsPage from './components/allocateRoom';
import DeallocateRoomsPage from './components/deallocateRoom';
import AddMemberPage from "./components/addMember";
import GetPositiveStudPage from "./components/getpositivestud"

let isLoggedIn = false;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}





const Home = () => {

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <h1>COVID QUARANATINE MANAGEMENT </h1>
      </section>
    </>
  );
};


const AdminLogin = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AdminLoginPage/>
      </section>
    </>
  );
};


const AddTests = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AddTestResultPage/>
      </section>
    </>
  );
};

const AddRooms = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AddRoomsPage/>
      </section>
    </>
  );
};

const FreeRooms = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <FreeRoomsPage/>
      </section>
    </>
  );
};

const AllocateRooms = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AllocateRoomsPage/>
      </section>
    </>
  );
};

const DeallocateRooms = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <DeallocateRoomsPage/>
      </section>
    </>
  );
};

const AddNewMembers = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AddMemberPage/>
      </section>
    </>
  );
};

const PositiveStudents = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <GetPositiveStudPage/>
      </section>
    </>
  );
};


const AdminLogout= () => {
  document.cookie = "admin_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-admin" }} />;
  
};


const App = () => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  let cookie;

  const [adminLoginStatus,setAdminLoginStatus] = useState(false);
  
  const [isLoggedIn,setLoggedInStatus] = useState(false);

  const [showMediaIcons, setShowMediaIcons] = useState(false);


  //useEffect is called during loading component,on changes to component and on leaving(unmounting) a component

  const isInitialMount = useRef(true);
  //Restricting useEffect to run only on updates except initial mount
  useEffect(() => {
    
    if (isInitialMount.current) {
      //findCookie();

      cookie = getCookie("admin_cookie");
      if(cookie==null){
        setAdminLoginStatus(false);
        
      } 
      else{
        setAdminLoginStatus(true);
      }

      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      //findCookie();
      cookie = getCookie("admin_cookie");
      if(cookie==null){
        setAdminLoginStatus(false);
        
      } 
      else{
        setAdminLoginStatus(true);
      }
    }
    if(!adminLoginStatus ){
      setLoggedInStatus(false);
    }
    else{
      setLoggedInStatus(true);
    }
    //console.log(cookie);
  });



  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login-admin">
        <AdminLogin />
      </Route>   
      <Route path="/add-members">
        <AddNewMembers />
      </Route>
      <Route path="/add-rooms">
        <AddRooms />
      </Route>
      <Route path="/add-tests">
        <AddTests />
      </Route>
      <Route path="/free-room">
        <FreeRooms />
      </Route>
      <Route path="/allocate-room/:room_id">
        <AllocateRooms />
      </Route>
      <Route path="/deallocate-rooms">
        <DeallocateRooms />
      </Route>
      <Route path="/logout">
        <AdminLogout/>
      </Route>
      <Route path="/positive-students">
        <PositiveStudents/>
      </Route>

    </Switch>
  );
};

export default App;
