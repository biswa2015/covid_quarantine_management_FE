import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './addRooms.css';
import tinyUrl from '../url';
import chatIcon from "./IIITB_logo.png";


class AddTestResultPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        student_id : '',
        result : '',
        url:'',
        isloggedin : this.getCookie('admin_cookie')!==undefined ? true : false
    }
    this.submitAddTestResult = this.submitAddTestResult.bind(this);
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
  submitAddTestResult(event){
      console.log(this.state);
      event.preventDefault();
      const token = this.getCookie('admin_cookie');
      const headers = { 
          'Authorization': `Bearer ${token}` 
      };

      
      
      axios.post(this.state.url+'add-test', this.state,{headers})
      .then(response => 
        {
          if(response.status==200){
            alert("Result Added!");
          }
          else{
            alert("Result not added.Please Try Again");
          }
          }
      )
      .catch(err=>{
        console.log(err);
        alert("Test not added.Please Try Again");
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
        <div className="AddTestResultPage">
          <div className="chat_icon_image_wrapper IIITB_logo">
        <img src={chatIcon} height={200} width={200} />
      </div>
          <h1>Add Test Result</h1>
          <Form onSubmit={this.submitAddTestResult}>
            <Form.Group size="lg" className="mb-3" controlId="formBasicStudentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.student_id}
                name = "student_id"
                onChange={this.detailsChange}
                placeholder = "Enter student ID"
              />
            </Form.Group>
            <Form.Group size="lg" className="mb-3" controlId="formBasicResult">
              <Form.Label>Result</Form.Label>
              <Form.Control
                required type="text"
                value={this.state.result}
                onChange={this.detailsChange}
                placeholder="Enter +VE / -VE / Pending"
                name="result"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Add Test Result
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

export default AddTestResultPage;