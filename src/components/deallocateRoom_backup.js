import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './addRooms.css';




class DeallocateRoomsPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        room_id : '',
    }
    this.submitDeallocateRooms = this.submitDeallocateRooms.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }


  // getCookie(cName) {
  //   const name = cName + "=";
  //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
  //   const cArr = cDecoded .split('; ');
  //   let res;
  //   cArr.forEach(val => {
  //       if (val.indexOf(name) === 0) res = val.substring(name.length);
  //   })
  //   return res;
  // }

  submitDeallocateRooms(event){
      console.log(this.state);
      event.preventDefault();
      // const token = this.getCookie('admin_cookie');
      // const headers = { 
      //     'Authorization': `Bearer ${token}` 
      // };

      
      
      axios.post('http://localhost:8095/deallocate-room', this.state)
      .then(response => 
        {
          if(response.status==200){
            alert("Room Added!");
          }
          else{
            alert("Room not added.Please Try Again");
          }
          }
      )
      .catch(err=>{
        console.log(err);
      });
  }

  detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }

  headers = {
      "Content-Type": "application/json"
  };


  render(){

    //if(!this.state.isLoggedIn){
      return (
        <div className="DeallocateRoomsPage">
          <h1>Deallocate Rooms</h1>
          <Form onSubmit={this.submitDeallocateRooms}>
            <Form.Group size="lg" className="mb-3" controlId="formBasicRoomID">
              <Form.Label>Room ID</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.room_id}
                name = "room_id"
                onChange={this.detailsChange}
                placeholder = "123"
              />
            </Form.Group>
            
            <Button size="lg" type="submit">
              Deallocate room
            </Button>
          </Form>
  
        </div>
       
      );
    // }
    // else{
    //   return <Redirect to = {{ pathname: "/" }} />;
    // }

  }
}

export default DeallocateRoomsPage;