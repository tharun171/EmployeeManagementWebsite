import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import EmployeeService from '../ServicesToCallRestApi/EmployeeService'

class viewEmployeeComponent extends Component {

    constructor(props)
    {
        super(props);
        this.state = 
        {
            firstName : '',
            lastName : '',
            emailId : ''
        }
         // Bind methods
         this.cancelHandler = this.cancelHandler.bind(this);
    }

    componentDidMount() 
    {
        const { id } = this.props.match.params;
        console.log("id in viewPage "+id);
        EmployeeService.viewEmployeeByIdRest(id)
            .then(response => {
                console.log("response "+response.data);
                this.setState({
                    firstName : response.data.firstName,
                    lastName : response.data.lastName,
                    emailId : response.data.emailId
                });
            })
            .catch(error => {
                console.error("Error fetching employee details: ", error);
            });
    }

    cancelHandler()
    {
        console.log("inside cancel handler.")
      //When user clicks cancel button, redirect to this page (mainPage)
      //Url configured in App.js
      this.props.history.push("/employees");
    }

  render() {
    return (
      <div>
        <div className = "container" style={{margin:"50px"}}>
            <div className='row'>
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                    <h3 className='text-center'>View Employee</h3>
                    <div className='card-body'>
                    <form>
                  <div className = "form-group">
                    <label>First Name:</label>
                    <input placeholder='First Name' name='firstName' className='form-control'
                      value={this.state.firstName} readOnly/>
                  </div>
                  <div className = "form-group">
                    <label>Last Name:</label>
                    <input placeholder='last Name' name='lastName' className='form-control'
                      value={this.state.lastName} readOnly/>
                  </div>
                  <div className = "form-group">
                    <label>Email Id:</label>
                    <input placeholder='Email' name='email' className='form-control'
                      value={this.state.emailId} readOnly/>
                  </div>
                  
                </form>
                <button className = 'btn btn-danger' onClick={this.cancelHandler.bind(this)} style={{margin:"15px"}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}


export default withRouter(viewEmployeeComponent);