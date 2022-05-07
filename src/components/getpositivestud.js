import {useState} from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import { NavLink } from 'react-bootstrap';
import './addtable.css'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Button from "react-bootstrap/Button";
import tinyUrl from '../url';


class GetPositiveStudPage extends Component {
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

    async getUsersData(){
      const token = this.getCookie('admin_cookie');
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
       const res2 = await axios.get(this.state.url+'get-positiveStudents',
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

    //async getData(room_id){
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        //console.log(pid+" "+cid)
      // const res = await axios.get('http://localhost:8081/get-ehr/'+pid+'/'+cid,{  
      //   headers: {
      //       'Authorization': 'doc_123'
      //   }
      // })
      //this.setState({viewrooms:true});
      //console.log(res);

   // }



    componentDidMount(){
      this.getUsersData()
      console.log(tinyUrl());
    this.setState({url:tinyUrl()});
    }

    async call(obj){
      const token = this.getCookie('admin_cookie');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
       const res2 = await axios.post(this.state.url+'send-Email',obj,
       {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      }
       //this.componentDidMount(); 
      )
      .then(response=>{
        if(response.status===200){
          alert("Email sent!");
        }
         this.componentDidMount(); 
      })
    //   const headers = {
    //     "Authorization" : `Bearer ${token}`
    // };
    .catch(err=>{
      console.log(err);
      alert("Email not sent");
    });

    this.componentDidMount();
       console.log(res2.data)
      this.setState({loading:false, users: res2.data})
    }


    render() {
      if(this.state.isloggedin)
    {
    if(!this.state.viewrooms){
          return (
            <MDBTable striped style={{"width":"80vw","fontSize":"1.4rem"}}>
            <MDBTableHead>
              <tr>
                <th>Student ID</th>
                <th>Result</th>
                <th>Test Date</th>
                {/* <th>Allocate</th> */}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                this.state.users.map((obj)=>(
                 <tr>
                    <td>{obj.student_id}</td>
                    <td>{obj.result}</td>
                    <td>{obj.testDate}</td>
                    { <td>
                      <Button className = "buttonsize" size="lg" type="button"
                          onClick={(e) => {
  
                              e.preventDefault();
                              this.setState({student_id:obj.student_id})
                              this.call(obj)  ;
                              
                          }}
                      >
                          Send Email
                      </Button>
                    
                    </td> }
                    
  
                </tr>   		
                
                
                ))
              }
      
            </MDBTableBody>
          </MDBTable>
          )
            }
          }
      // const columns = [{  
      //   Header: 'Student ID',  
      //   accessor: 'student_id',
      //  }
      //  ,{  
      //   Header: 'Result',  
      //   accessor: 'result',
      //  }
       
      //  ,{  
      //   Header: 'Test Date',  
      //   accessor: 'testDate',
      //  }

    //     ,{
    //       Header: 'Allocate',  
    //     accessor: 'room_id',
    //    Cell: ({ original }) => (
    //     <button
    //       type="button"
    //       onClick={(e) => {
    //       console.log(original);
    //         e.preventDefault();
    //         window.location.href='http://localhost:8095/get-freerooms/'+original.room_id;
    //         this.setState({room_id:original.room_id})
    //         this.getData(original.room_id)  ;
    //       }}
    //     >
    //       Allocate room
    //     </button>)
    //       // <td>
    //       // <NavLink to={"/view-ehr/"+original.patient_id+'/'+original.consent_id}> View Record </NavLink>
    //       // </td>
    //     }
        
        
  else
  {
    return <Redirect to = {{ pathname: "/" }} />;
  }

    }
  }

export default GetPositiveStudPage;