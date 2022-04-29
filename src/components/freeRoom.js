import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import './addtable.css'


class FreeRoomsPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        viewrooms : false,
        room_id : '',
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
       const res2 = await axios.get('http://cqcmp:8102/get-freerooms',
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
    }
    render() {
      const columns = [{  
        Header: 'Available Room ID',  
        accessor: 'room_id',
       },
       {  
        Header: 'Available Room Numbers',  
        accessor: 'roomNum',
       }
       
       ,{  
        Header: 'Available Floor Numbers',  
        accessor: 'floorNum',
       }
       ,{
        Header: 'Allocate',  
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
        }}
      >
        Allocate room
      </button>)
        // <td>
        // <NavLink to={"/view-ehr/"+original.patient_id+'/'+original.consent_id}> View Record </NavLink>
        // </td>
      }
        
        
    ]
    if(this.state.isloggedin)
    {
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