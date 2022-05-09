import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import tinyUrl from '../url';
import chatIcon from "./IIITB_logo.png";


class AdminLoginPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        email : '',
        password : '',
        url:'',
        isLoggedIn: false
    }
    this.submitAdminLogin = this.submitAdminLogin.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
    
  }

componentDidMount(){
  console.log(tinyUrl());
  this.setState({url:tinyUrl()});
}
  //url = tinyUrl();
  submitAdminLogin(event){
    //console.log(this.state);
    event.preventDefault();
    const headers = { 
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    };
    
    
    //axios.post('http://localhost:8102/login-admin', this.state, { headers })
    axios.post(this.state.url+'login-admin', this.state, { headers })
    .then(response => 
      {
        if(response.status==200){
          //setting the cookie here
          document.cookie = "admin_cookie=" + response.data;
          this.setState({isLoggedIn : true});
          console.log("Cookie set");
          alert("Admin Login Successful!");
          //console.log(this.getCookie('admin_cookie'));
          
        }
      }
    )
    .catch(err=>{
      console.log(err);
      alert("Wrong Details! Enter the valid Details");
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

    if(!this.state.isLoggedIn){
      return (
        <div className="AdminLoginPage">
          <div className="chat_icon_image_wrapper IIITB_logo">
        <img src={chatIcon} height={200} width={200} />
      </div>
          <h1>LOGIN PAGE</h1>
          <Form onSubmit={this.submitAdminLogin}>
            <Form.Group size="lg" className="form" controlId="formBasicAdminEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.admin_email}
                name = "email"
                onChange={this.detailsChange}
                placeholder = "email"
              />
            </Form.Group>
            <Form.Group size="lg" className="form" controlId="formBasicAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={this.state.admin_password}
                onChange={this.detailsChange}
                placeholder="password"
                name="password"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Login
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

export default AdminLoginPage;
