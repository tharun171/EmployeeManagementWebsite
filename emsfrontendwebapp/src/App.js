// import logo from './logo.svg';
import "./App.css";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";
import ListEmpComponent from "./Components/ListEmpComponent";
import CreateEmployeeComponent from "./Components/CreateEmployeeComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import viewEmployeeComponent from "./Components/viewEmployeeComponent";


function App() {
  return (
    <div>
    <Router>
      <HeaderComponent />
      <div className="container">
        {/* we are using React-router-5 here  
        which used class component*/}
        <Switch>
          {/* if we dont use exact router may invoke all components */}
          <Route path="/" exact component={ListEmpComponent}></Route>
          <Route path="/employees" exact component={ListEmpComponent}></Route>
          <Route path = "/addEmployee" exact component={CreateEmployeeComponent}></Route>
          <Route path = "/viewEmployee/:id" exact component={viewEmployeeComponent}></Route>
          <Route path = "/updateEmployee/:updateId" exact component={CreateEmployeeComponent}></Route>
        </Switch>
      </div>
      <FooterComponent />
    </Router>
  </div>
  );
}

export default App;
