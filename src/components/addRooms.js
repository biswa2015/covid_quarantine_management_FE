import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './registration.css';
import tinyUrl from '../url';
import chatIcon from "./IIITB_logo.png";


class AddRoomsPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        roomNum : null,
         floorNum : null,
         url:'',
         isloggedin : this.getCookie('admin_cookie')!=undefined ? true : false
    }
    this.submitAddRooms = this.submitAddRooms.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }


   getCookie(cName) {
     const name = cName + "=";
     const cDecoded = decodeURIComponent(document.cookie); //to be careful
     const cArr = cDecoded .split('; ');
     let res;
     cArr.forEach(val => {
         if (val.indexOf(name) === 0) res = val.substring(name.length);
     })
     return res;
   }
   componentDidMount(){
    console.log(tinyUrl());
    this.setState({url:tinyUrl()});
  }

  submitAddRooms(event){
      const token=this.getCookie('admin_cookie');
      console.log(this.state);
      event.preventDefault();
      // const token = this.getCookie('admin_cookie');
      const headers = {
        //'Access-Control-Allow-Origin':'*' 
        'Authorization': `Bearer ${token}` 
       };

      
      
      // axios.post('http://localhost:8102/add-room', this.state)
      axios.post(this.state.url+'add-room', this.state, {headers})
      .then(response => 
        {
          console.log(response.status)
          if(response.status===200){
            alert("Room Added!");
          }
          else{
            alert("Room already exists");
          }
        }
        
      )
      .catch(err=>{
        console.log(err);
        alert("Room already exists");
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

    //if(this.state.isloggedin){
      return (
        <div className="AddRoomsPage">
          <div className="chat_icon_image_wrapper IIITB_logo">
        <img src={chatIcon} height={200} width={200} />
      </div>
          <h1>Add Rooms</h1>
          <Form onSubmit={this.submitAddRooms}>
            <Form.Group size="lg" className="mb-3" controlId="formBasicRoomNumber">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                required type="Number"
                value={this.state.roomNum}
                name = "roomNum"
                onChange={this.detailsChange}
                placeholder = "enter room number"
              />
            </Form.Group>
            <Form.Group size="lg" className="mb-3" controlId="formBasicFloorNumber">
              <Form.Label>Floor Number</Form.Label>
              <Form.Control
                required type="Number"
                value={this.state.floorNum}
                onChange={this.detailsChange}
                placeholder="enter floor number"
                name="floorNum"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Add room
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

export default AddRoomsPage;