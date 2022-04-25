import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import viewEHR from './viewEHR.js';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import './grantedConsents.css'

class DeallocateRoomsPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        viewrooms : false,
        room_id : '',
      }
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

    async getUsersData(){
      // const token = this.getCookie('doctor_cookie');
      // const res = await axios.get('https://jsonplaceholder.typicode.com/users')
       const res = await axios.get('http://localhost:8095/get-allocations')
       //,{
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
       console.log(res.data)
      this.setState({loading:false, users: res.data})
    }

    async getData(room_id){
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        //console.log(pid+" "+cid)
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
    }
    render() {
      const columns = [{  
        Header: 'Occupied Room Numbers',  
        accessor: 'room_id',
       }
        ,{
          Header: 'Deallocate',  
        accessor: 'room_id',
       Cell: ({ original }) => (
        <button
          type="button"
          onClick={(e) => {
          console.log(original);
            e.preventDefault();
            //window.location.href='http://localhost:8081/get-ehr/'+original.patient_id+'/'+original.consent_id;
            this.setState({room_id:original.room_id})
            this.getData(original.room_id)  ;

            axios.post('http://localhost:8095/deallocate-room', this.state.room_id)
            .then(response => 
              {
                if(response.status==200){
                  alert("Room Deallocated Added!");
                }
                else{
                  alert("Please Try Again");
                }
                }
            )
          }}
        >
          Deallocate room
        </button>)
          // <td>
          // <NavLink to={"/view-ehr/"+original.patient_id+'/'+original.consent_id}> View Record </NavLink>
          // </td>
        }
        
        
    ]
    if(!this.state.viewrooms){
      return (
        <div style={{marginTop:"200px"}}>
          <ReactTable  
          data={this.state.users}  
          columns={columns}  
          />
        </div>

      )      
    }
    else{
      
      //return <Redirect to = {{ pathname: "/allocate-room/" + this.state.room_id }} />;
      // axios.post('http://localhost:8095/deallocate-room', this.state.room_id)
      // .then(response => 
      //   {
      //     if(response.status==200){
      //       alert("Room Deallocated Added!");
      //     }
      //     else{
      //       alert("Please Try Again");
      //     }
      //     }
      // )
      
    }

    }
  }

export default DeallocateRoomsPage;