import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"
//import viewEHR from './viewEHR.js';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import tinyUrl from '../url';
import './addtable.css'
import chatIcon from "./IIITB_logo.png";

class DeallocateRoomsPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        //getEhrResp : false,
        pid : '',
        cid : '',
        url:'',
        Vehr : false,
        isloggedin : this.getCookie('admin_cookie')!==undefined ? true : false,
        room_id : '',
        viewrooms:false
      }
      this.call = this.call.bind(this);
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


    async componentDidMount(){
      const token = this.getCookie('admin_cookie');
      console.log(tinyUrl());
      await this.setState({url:tinyUrl()});
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      console.log(this.state.url);
      const res = await axios.get(this.state.url+'get-allocations',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      //console.log(res.data.delegateAccess.toLowerCase())
      console.log(res.data);
     

      await this.setState({loading:false, users: res.data})
      console.log(this.state.users);
    }

    async call(obj){
      const token = this.getCookie('admin_cookie');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
       const res2 = await axios.post(this.state.url+'deallocate-room',obj,
       {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      }
       //this.componentDidMount(); 
      )
      .then(response=>{
        this.componentDidMount(); 
      })
    //   const headers = {
    //     "Authorization" : `Bearer ${token}`
    // };
    this.componentDidMount();
       console.log(res2.data)
      this.setState({loading:false, users: res2.data})
    }




   
    render() {

    if(this.state.isloggedin){
      if(!this.state.viewrooms && this.state.users!==undefined){
        return (
          <MDBTable striped style={{"width":"80vw","fontSize":"1.4rem"}}>
          <MDBTableHead>
          <div className="chat_icon_image_wrapper IIITB_logo">
        <img src={chatIcon} height={200} width={200} />
      </div>
            <tr>
              <th>Allocation ID</th>
              <th>Student ID</th>
              <th>Room ID</th>
              <th>Deallocate Room</th>
              {/* <th>Validity</th>
              <th>View Consent</th> */}
              {/* <th>Vacated</th> */}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            
            {
              
              this.state.users.map((obj)=>(
               <tr>
                  <td>{obj.alloc_id}</td>
                  <td>{obj.student_id}</td>
                  <td>{obj.room_id}</td>
           
                  {obj.vacated===0 ?  (
                    <td>
                      <Button className = "buttonsize" size="lg" type="button"
                          onClick={(e) => {
                            console.log(obj);
                              e.preventDefault();
                              this.setState({room_id:obj.room_id})
                              this.call(obj)
                              /* axios.post(this.state.url+'deallocate-room', {room_id:obj.room_id})
                              .then(response =>
                                {
                                  if(response.status==200){
                                    alert("Room Deallocated!");
                                  }
                                  else{
                                    alert("Please Try Again");
                                  }
                                  }
                              ) */
                              //this.getData(obj.room_ID)  ;

                          }}
                      >
                          Deallocate
                      </Button>
                 
                    </td>
                  ) :
                    <td></td>
                  }

              </tr>  
             
             
              ))
            }
   
          </MDBTableBody>
        </MDBTable>
 
        )      
      }
     
    }
    else{
        return <Redirect to = {{ pathname: "/" }} />;
    }


    }
  }

export default DeallocateRoomsPage;