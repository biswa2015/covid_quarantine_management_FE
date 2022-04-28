import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './registration.css';


class AddMemberPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        sName : '',
        sEmail : '',
        sRoll : '',
        sContact : '',
        isloggedin : this.getCookie('admin_cookie')!==undefined ? true : false

    }
    this.submitAddMember = this.submitAddMember.bind(this);
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

  submitAddMember(event){
      console.log(this.state);
      event.preventDefault();
      const token = this.getCookie('admin_cookie');
      const headers = { 
          'Authorization': `Bearer ${token}` 
      };
  
      
      //axios.post('http://localhost:8102/add-member', this.state)
      axios.post('http://localhost:8095/add-member', this.state,{headers})
      .then(response => 
        {
          if(response.status==200){
            alert("Student Added!");
          }
          else{
            alert("Result not added.Please Try Again");
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

    
    if(this.state.isloggedin){
      return (
        <div className="AddMemberPage">
          <h1>Add Member</h1>
          <Form onSubmit={this.submitAddMember}>
            <Form.Group size="lg" className="mb-3" controlId="formBasicStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.sName}
                name = "sName"
                onChange={this.detailsChange}
                //placeholder = "123"
              />
            </Form.Group>

            <Form.Group size="lg" className="mb-3" controlId="formBasicEmailId">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.sEmail}
                name = "sEmail"
                onChange={this.detailsChange}
                //placeholder = "123"
              />
            </Form.Group>

            <Form.Group size="lg" className="mb-3" controlId="formBasicRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.sRoll}
                name = "sRoll"
                onChange={this.detailsChange}
                //placeholder = "123"
              />
            </Form.Group>

            <Form.Group size="lg" className="mb-3" controlId="formBasicContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.sContact}
                name = "sContact"
                onChange={this.detailsChange}
                //placeholder = "123"
              />
            </Form.Group>
        
            <Button size="lg" type="submit">
              Add Member
            </Button>
          </Form>
  
        </div>
       
      );
    }
    else{
      return <Redirect to = {{ pathname: "/" }} />;
    }

  }
}

export default AddMemberPage;