import React from "react";
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

let isLoggedIn = false;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

let cookie = getCookie("admin_cookie"); 
if(cookie!=null){
  isLoggedIn = true;
  //alert("cookie there");
}
else{
  isLoggedIn = false;
}



const Home = () => {

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Hospital App Home Page</h1>
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


const AdminLogout= () => {
  document.cookie = "admin_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-admin" }} />;
  
};


const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login-admin">
        <AdminLogin />
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
      <Route path="/add-members">
        <AddNewMembers />
      </Route>

    </Switch>
  );
};

export default App;
