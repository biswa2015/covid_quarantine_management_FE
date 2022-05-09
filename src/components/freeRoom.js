import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Button from "react-bootstrap/Button";
import './addtable.css'
import tinyUrl from '../url';
import chatIcon from "./IIITB_logo.png";


class FreeRoomsPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        viewrooms : false,
        room_id : '',
        url:'',
        isloggedin : this.getCookie('admin_cookie')!==undefined ? true : false
      }
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

  //   async getUsersData(){
  //     const token = this.getCookie('admin_cookie');
  //     const res = await axios.get('https://jsonplaceholder.typicode.com/users')
  //      const res2 = await axios.get('http://localhost:8095/get-freerooms')
  //      {
  //       headers: {
  //         "Authorization" : `Bearer ${token}`
  //       }
  //     })
  //     // const headers = {
  //     //   "Authorization" : `Bearer ${token}`
  //  // };
  //      console.log(res2.data)
  //     this.setState({loading:false, users: res2.data})
  //   }

    async getUsersData(){
      const token = this.getCookie('admin_cookie');
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
       const res2 = await axios.get(this.state.url+'get-freerooms',
       {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    //   const headers = {
    //     "Authorization" : `Bearer ${token}`
    // };
       console.log(res2.data)
      this.setState({loading:false, users: res2.data})
    }

    async getData(room_id){
      // const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      //   console.log(pid+" "+cid)
      // const res = await axios.get('http://localhost:8081/get-ehr/'+pid+'/'+cid,{  
      //   headers: {
      //       'Authorization': 'doc_123'
      //   }
      // })
      this.setState({viewrooms:true});
      //console.log(res);

   }


    componentDidMount(){
      this.getUsersData()
      console.log(tinyUrl());
    this.setState({url:tinyUrl()});
    }
    render() {

    if(this.state.isloggedin)
    {
    if(!this.state.viewrooms){
          return (
            
            <MDBTable striped style={{"width":"80vw","fontSize":"1.4rem"}}>
            <MDBTableHead>
            <div className="chat_icon_image_wrapper IIITB_logo">
        <img src={chatIcon} height={200} width={200} />
      </div>
              <tr>
                <th>Available Room ID</th>
                <th>Available Room Numbers</th>
                <th>Available Floor Numbers</th>
                <th>Allocate</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                this.state.users.map((obj)=>(
                 <tr>
                    <td>{obj.room_id}</td>
                    <td>{obj.roomNum}</td>
                    <td>{obj.floorNum}</td>
                    <td>
                      <Button className = "buttonsize" size="lg" type="button"
                          onClick={(e) => {
  
                              e.preventDefault();
                              this.setState({room_id:obj.room_id})
                              this.getData(obj.room_id)  ;
                              
                          }}
                      >
                          Allocate Room
                      </Button>
                    
                    </td>
                    
  
                </tr>   		
                
                
                ))
              }
      
            </MDBTableBody>
          </MDBTable>
          )
     
    }
    else{
      
      return <Redirect to = {{ pathname: "/allocate-room/" + this.state.room_id }} />;
      
    }
  }
  else
  {
    return <Redirect to = {{ pathname: "/" }} />;
  }

    }
  }

export default FreeRoomsPage;