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
import './addtable.css'

class DeallocateRoomsPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        users: [],
        loading:true,
        getEhrResp : false,
        pid : '',
        cid : '',
        Vehr : false,
        isloggedin : this.getCookie('admin_cookie')!==undefined ? true : false,
        room_id : ''
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

    async componentDidMount(){
      const token = this.getCookie('admin_cookie');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      const res = await axios.get('http://cqcmp:8102/get-allocations',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      //console.log(res.data.delegateAccess.toLowerCase())
      console.log(res.data);


      this.setState({loading:false, users: res.data})
      console.log(this.state.users);
    }

    async getData(room_id){
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        //console.log(pid+" "+cid)
      // const res = await axios.get('http://localhost:8081/get-ehr/'+pid+'/'+cid,{  
      //   headers: {
      //       'Authorization': 'doc_123'
      //   }
      // })
    // this.setState({getEhrResp:true});
     
      //console.log(res);

    }



   
    render() {

    if(this.state.isloggedin){
      if(!this.state.getEhrResp){
        return (
          <MDBTable striped style={{"width":"80vw","fontSize":"1.4rem"}}>
          <MDBTableHead>
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
                  {/* <td>{obj.startDate}</td>
                  <td>{obj.endDate}</td>
                  <td>{obj.vacated}</td> */}
                  {/* <td>
                    <Button className = "buttonsize" size="lg" type="button"
                        onClick={(e) => {

                            e.preventDefault();
                            this.setState({pid:obj.patient_id,cid:obj.consent_id})
                            this.getData(obj.patient_id,obj.consent_id)  ;
                            this.setState({Vehr:true});
                        }}
                    >
                        View Record
                    </Button>
                 
                  </td> */}
                  {obj.vacated===0 ?  (
                    <td>
                      <Button className = "buttonsize" size="lg" type="button"
                          onClick={(e) => {
                            console.log(obj);
                              e.preventDefault();
                              this.setState({room_id:obj.room_id})
                              axios.post('http://cqcmp:8102/deallocate-room', {room_id:obj.room_id})
                              .then(response =>
                                {
                                  if(response.status==200){
                                    alert("Room Deallocated!");
                                  }
                                  else{
                                    alert("Please Try Again");
                                  }
                                  }
                              )
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