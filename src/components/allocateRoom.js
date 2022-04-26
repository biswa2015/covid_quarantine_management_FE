
import React,{Component} from 'react'
import {Form ,Button} from 'react-bootstrap'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
//import { Redirect } from 'react-router';


class AllocateRoomsPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            student_id : '',
            room_id : this.props.match.params.room_id
        }
        this.submitAllocateRooms = this.submitAllocateRooms.bind(this);
        this.detailsChange = this.detailsChange.bind(this);
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    // getCookie(cName) {
    //     const name = cName + "=";
    //     const cDecoded = decodeURIComponent(document.cookie); //to be careful
    //     const cArr = cDecoded .split('; ');
    //     let res;
    //     cArr.forEach(val => {
    //         if (val.indexOf(name) === 0) res = val.substring(name.length);
    //     })
    //     return res;
    //   }

    submitAllocateRooms(event){
      console.log(this.state);
      event.preventDefault();
    //   const token=this.getCookie('doctor_cookie')
    //   const headers = {
    //       "Authorization" : `Bearer ${token}`
    //   };
      
     // axios.post('http://localhost:8095/allocate-room/'+this.state.student_id+'/'+this.props.match.params.room_id)
        axios.post('http://localhost:8095/allocate-room/', this.state)
       .then(response => 
         {
            if(response.status==200){
                alert("Room Allocated!");
              }
              else{
                alert("Room not allocated.Please Try Again");
              }
         }
      );
  }

  detailsChange(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}


    render(){
        const {match,location,history} = this.props;
        return (
        
            <div className="AllocateRooms">
                <h1>ALLOCATE ROOMS</h1>
                <Form onSubmit = {this.submitAllocateRooms}>
                    <Form.Group className="mb-3" controlId="formBasicstudentID">
                        <Form.Label>Enter Student Id</Form.Label>
                        <Form.Control required type="text" name="student_id" value={this.state.student_id} onChange={this.detailsChange} /*placeholder="Your Name"*/ />
                    </Form.Group>


                    <Button size="lg" variant="primary" type="submit">
                        Allocate Room
                    </Button>
                </Form>
            </div>
              
        );
    }

}


//export default DelegateConsentPage;
const AllocateRoomsWithRouter = withRouter(AllocateRoomsPage);
export default  AllocateRoomsWithRouter;

    