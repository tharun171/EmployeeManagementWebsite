import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:9090/api/v1";

class EmployeeService
{
    getAllEmployeesService()
    {
        return axios.get(EMPLOYEE_API_BASE_URL+"/employees");
    }

    createEmployeeRest(employee)
    {
        return axios.post(EMPLOYEE_API_BASE_URL+"/employee",employee);
    }

    viewEmployeeByIdRest(id)
    {
        return axios.get(EMPLOYEE_API_BASE_URL+"/employee/"+id);
    }

    deleteEmployeeByIdRest(id)
    {
        return axios.delete(EMPLOYEE_API_BASE_URL+"/employee/"+id);
    }

    updateEmployeeByIdRest(id,updatedBean)
    {
        console.log("EmployeeService - updateEmployeeByIdRest - "+JSON.stringify(updatedBean));
        return axios.put(EMPLOYEE_API_BASE_URL+"/employee/"+id,updatedBean);
    }
}


//exporting class object
export default new EmployeeService()