import React, { Component } from 'react'
import EmployeeService from '../ServicesToCallRestApi/EmployeeService'
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../cssFolder/ListEmployeeComp.css'; // Correct relative path to the CSS file

class ListEmpComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            DummyData: [
                {
                    "id": 1,
                    "firstName": "someone",
                    "lastName": "something",
                    "emailId": "someone@Gmail.com"
                },
                {
                    "id": 2,
                    "firstName": "someone",
                    "lastName": "something",
                    "emailId": "someone@Gmail.com"
                },
                {
                    "id": 3,
                    "firstName": "someone",
                    "lastName": "something",
                    "emailId": "someone@Gmail.com"
                }
            ]
        }
        this.addEmployeeMethod = this.addEmployeeMethod.bind(this);
        this.viewEmployeeMethod = this.viewEmployeeMethod.bind(this);
    }

//In-Built method to call REST API
componentDidMount()
{
    //when page rendering for first time
    //This executes
    this.getAllEmployeeFromDatabase();
}

getAllEmployeeFromDatabase()
{
   //From EmployeeService - from there rest api calls happen
   EmployeeService.getAllEmployeesService().then(
    //response is a variable
    (response) => {
        //Setting actual data what we got from REST Api
        //Assigning those to DummyData
        console.log("getting employees data from EmployeeService REST APis")
        this.setState({DummyData : response.data});
    })
    .catch(error => {
        console.error("Error fetching employees: ",error);
    });
}

//User-defined methods
addEmployeeMethod()
{
    // Navigate to the /addEmployee route in App.js
    {/*
        history = object provided by React Router to help with navigation
        It is passed as a prop to your component by React Router <Route> component
        This object contains methods to manipulate browser history, such as push,replace and goBack
        Push = method of history object is used to navigate to new route
        When you call history.push('/addEmployee')
        it updates the browser's URL to /addEmployee and adds an entry to the browser's history stack
        This means users can navigate back to the previous page using the browser's back button.
    */}
    this.props.history.push('/addEmployee');
}
viewEmployeeMethod(employeeVar)
{
    console.log("viewEmployeeMethod id passed "+employeeVar.id);
    //will go to App.jsx
    this.props.history.push(`/viewEmployee/${employeeVar.id}`);
}
deleteEmployeeMethod(empVar)
{
    console.log("deleteEmployeeMethod id passed : "+empVar.id);
    EmployeeService.deleteEmployeeByIdRest(empVar.id).then(response => 
    {
        console.log(response.data);
        this.getAllEmployeeFromDatabase();
        //will go to App.jsx
        this.props.history.push('/employees');
    }).catch(error => 
    {
        console.error("deleteEmployeeMethod - ListEmpComponent.jsx -> "+error);
    });
}
updateEmployeeMethod(empVar)
{
    console.log("updateEmployeeMethod id passed : "+empVar.id);
    this.props.history.push(`/updateEmployee/${empVar.id}`);
}
    render() {
        return (
            <div className="container" style={{marginBottom:"150px"}}>
                <h2 className="text-center" style={{marginTop:"50px"}}>Employee List</h2>
                <div>
                    <button className = "btn btn-primary mainHeading" onClick={this.addEmployeeMethod}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* js */}
                            {
                                // map to iterate over the list
                                this.state.DummyData.map(
                                    // empVar is variable name
                                    empVar =>
                                        // names are from BeanClass in Backend
                                        <tr key={empVar.id}>
                                            <td>{empVar.id}</td>
                                            <td>{empVar.firstName}</td>
                                            <td>{empVar.lastName}</td>
                                            <td>{empVar.emailId}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => this.viewEmployeeMethod(empVar)} style={{marginLeft:"10px"}}>View</button>
                                                <button className="btn btn-warning" onClick={() => this.updateEmployeeMethod(empVar)} style={{marginLeft:"10px"}}>Update</button>
                                                <button className="btn btn-danger" onClick={() => this.deleteEmployeeMethod(empVar)} style={{marginLeft:"10px"}}>Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default withRouter(ListEmpComponent);