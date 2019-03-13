import {Component} from "react";
import React from "react";
import {Modal} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {Card} from 'antd';
import 'antd/es/card/style/index.css';
import 'antd/es/modal/style/index.css';
import {fetchAPI} from "./../../utility";
import UpdateAppointment from './../calendars/UpdateAppointment'

class HomepagePatient extends Component {
 constructor(props) {
        super(props);
        this.state = {
            appointments:[],
            cardList:'',
            isLoading: true,
            modal: false,
            appointment: {},
            newAppointment: []
        };
        this.handleAppointmentsPatient();
        this.cancel = this.cancel.bind(this)
    }

    handleOpenModal = (app) => {
        this.setState({appointment: app, modal: true})
    }

    handleCloseModal = (e) => {
        this.setState({appointmentId: '', modal: false})
    }

    handleSelect(newApp){
        this.setState({newAppointment: newApp})
    }

    handleUpdate = (e) => {
        this.updateAppointment()
    }

    async updateAppointment(){
        let data;
        if (this.state.newAppointment[0] == 'Checkup')
            data = {id: this.state.appointment.id, hcnumber: this.props.user.hcnumber, length:'20', time: this.state.newAppointment[2], date: this.state.newAppointment[1]}
        else
            data = {id: this.state.appointment.id, hcnumber: this.props.user.hcnumber, length:'60', time: this.state.newAppointment[2], date: this.state.newAppointment[1]}
        fetchAPI("PUT", '/api/appointment/update', data).then(
            response => {
                try{
                    if(response.success){
                        this.setState({
                            newAppointment: [], appointment:{}, modal: false
                        });
                        console.log("Patient " + this.props.user.hcnumber + " successfully updated appointment")
                    }
                    else {
                        console.log("Patient " + this.props.user.hcnumber + " failed to update appointment")
                    }
                    this.handleAppointmentsPatient();
                } catch(e) {console.error("Error getting appointments for patient:", e)}
            }
        ).catch((e)=>console.error("Error getting appointments for patient:", e))
    }

    async handleAppointmentsPatient(){
     let route = "/api/appointment/check?hcnumber=" + this.props.user.hcnumber;
        console.log(route);
        fetchAPI("GET",route).then(
            response => {
                try{
                    if(response.success){
                        this.setState({
                            appointments: response.appointments
                        });
                        console.log("Patient " + this.props.user.hcnumber + " successfully retrieved appointments")
                    }
                    else {
                        console.log("Patient " + this.props.user.hcnumber + " failed to retrieve appointments")
                    }
                    this.generateCardList();
                } catch(e) {console.error("Error getting appointments for patient:", e)}
            }
        ).catch((e)=>console.error("Error getting appointments for patient:", e))
    }

    async cancel(id){
        let data = {id: id}
        fetchAPI("DELETE", '/api/appointment/cancel', data).then(
            response => {
                try{
                    if(response.success){
                        this.setState({
                            appointments: response.appointments
                        });
                        console.log("Patient " + this.props.user.hcnumber + " successfully cancelled appointment")
                    }
                    else {
                        console.log("Patient " + this.props.user.hcnumber + " failed to cancel appointments")
                    }
                    this.handleAppointmentsPatient();
                } catch(e) {console.error("Error getting appointments for patient:", e)}
            }
        ).catch((e)=>console.error("Error getting appointments for patient:", e))
    }

    async generateCardList() {
     let appointmentsAsCards = this.state.appointments.map((appointment) => {
         return (
             <div>
                 <Card
                    title={appointment.date}
                    extra={<div>
                            <a onClick={() => this.handleOpenModal(appointment)}>Update Appointment</a>
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <a onClick={() => this.cancel(appointment.id)}>Cancel Appointment</a>
                        </div>}
                    style={{ width: 800 }}>
                     <p>{appointment.length} minute appointment with doctor id: {appointment.doctor_permit_number}</p>
                     <p>Room: {appointment.room}</p>
                     <p>Time: {appointment.time}</p>
                </Card>
                <br/>
            </div>
         )
     });
     this.setState({cardList: appointmentsAsCards, isLoading: false})
    }

    render(){
       return (
            <div>
                <br/>
                <br/>
                <br/>
                <Modal show={this.state.modal}>
                    <Modal.Header>
                        <Modal.Title>Select a New Appointment Date</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateAppointment currentAppointment={this.state.appointment} handleSelect={this.handleSelect.bind(this)}></UpdateAppointment>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>Cancel</Button>
                        <Button variant="primary" onClick={this.handleUpdate}>Update</Button>
                    </Modal.Footer>
                </Modal>
                <h3>Upcoming appointments:</h3>
                {this.state.isLoading ? 'Loading...' : this.state.cardList}
            </div>
       );
    }
}
export default HomepagePatient;