import React, { Component } from 'react'
import EmployeeService from '../ServicesToCallRestApi/EmployeeService';

export default class CreateEmployeeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      emailId: '',
      errors:
      {
        firstName: '',
        lastName: '',
        emailId: ''
      }
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveEmployeeHandler = this.saveEmployeeHandler.bind(this);
  }

  componentDidMount() {
    this.pageTitle();
    const { updateId } = this.props.match.params;
    //setting user data when clicked on updateEmployee Page
    if (updateId) {
      EmployeeService.viewEmployeeByIdRest(updateId).then(response => {
        console.log(response.data);
        console.log("firstname " + response.data.firstName);
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          emailId: response.data.emailId
        });
      });
    }
  }

  //we can do save or update here
  //Dynamically changing page title
  pageTitle() {
    //name same as in App.jsx for update Method id
    const { updateId } = this.props.match.params;
    console.log("fetchWhetherToSaveOrUpdate : " + updateId);
    //Modifying Page Title
    if (updateId) { return <h2 className="text-center">Update Employee</h2> }
    else { return <h2 className="text-center">Add Employee</h2> }
  }

  submitButtonName() {
    //name same as in App.jsx for update Method id
    const { updateId } = this.props.match.params;
    console.log("submitButtonName : " + updateId);
    //Modifying submit button name as save or update
    if (updateId) { return "Update" }
    else { return "Save" }
  }

  //When user clicked on Save button in addEmployee page
  saveEmployeeHandler = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      //configuring to store data
      let employeeData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId
      };
      console.log("employee => " + JSON.stringify(employeeData));
      const { updateId } = this.props.match.params;
      if (updateId) {
        //Updating
        EmployeeService.updateEmployeeByIdRest(updateId, employeeData).then(response => {
          console.log("updated details " + JSON.stringify(response.data));
          //Calling /employees page
          this.props.history.push("/employees");
        }).catch(error => {
          console.error("saveEmployeeHandler error => " + error);
        })
        console.log("updated");
      }
      else {
        //Saving employee using RestApi
        //From EmployeeService
        EmployeeService.createEmployeeRest(employeeData).then(response => {
          this.props.history.push("/employees");
        }).catch(error => {
          console.error("error in saveEmployeeHandler : " + error);
        });
      }
    }
  }

  cancelHandler() {
    //When user clicks cancel button, redirect to this page (mainPage)
    //Url configured in App.js
    this.props.history.push("/employees");
  }
  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  }
  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  }
  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  }

  validateForm() {
    let valid = true;
    //... = spread Operator to copy object into another object
    //copying errors from above into errorsCopy
    const errorsCopy = { ...this.state.errors }
    if (this.state.firstName.trim()) {
      //setting error String value
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }
    if (this.state.lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }
    if (this.state.emailId.trim()) {
      errorsCopy.emailId = '';
    } else {
      errorsCopy.emailId = "Email is required";
      valid = false;
    }
    this.setState({ errors: errorsCopy });
    return valid;
  }


  render() {
    return (
      <div>
        <div className='container'>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {
                this.pageTitle()
              }
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>First Name:</label>
                    {/* className='form-control' */}
                    <input placeholder='First Name' name='firstName' className={`form-control ${this.state.errors.firstName ? 'is-invalid' : ''}`}
                      value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                    {this.state.errors.firstName && <div className="invalid-feedback">{this.state.errors.firstName}</div>}
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input placeholder='last Name' name='lastName' className={`form-control ${this.state.errors.lastName ? 'is-invalid' : ''}`}
                      value={this.state.lastName} onChange={this.changeLastNameHandler} />
                    {this.state.errors.lastName && <div className="invalid-feedback">{this.state.errors.lastName}</div>}

                  </div>
                  <div className="form-group">
                    <label>Email Id:</label>
                    <input placeholder='Email' name='email' className={`form-control ${this.state.errors.emailId ? 'is-invalid' : ''}`}
                      value={this.state.emailId} onChange={this.changeEmailHandler} />
                    {this.state.errors.emailId && <div className="invalid-feedback">{this.state.errors.emailId}</div>}

                  </div>
                  <button className='btn btn-success' onClick={this.saveEmployeeHandler} style={{ margin: "10px" }}>{this.submitButtonName()}</button>
                  <button className='btn btn-danger' onClick={this.cancelHandler.bind(this)} style={{ margin: "10px" }} >Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
