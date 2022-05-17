import React,{useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "pages/Users";
import Dashboard from "components/Dashboard";
import UserDetails from "pages/UserDetails";
import MedicalDetails from "pages/MedicalDetails";
import Aitrack from "pages/AiTrack";
import EditUser from "pages/EditUser";
import CaptureDetails from "pages/CaptureDetails";
import Detect from "pages/Dectect";
import Sidebar from "components/Sidebar";
import Login from "components/Login";

import "./App.css";
// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
import { Divider } from "@mui/material";

import {SideBarContext} from 'components/SidebarContext'

function App() {
  const [isLogged, setisLogged] = React.useState(false);
  const [loginToken, setloginToken] = React.useState(
    localStorage.getItem("token")
  );

  const [marginLeft, setmarginLeft] = React.useState("64");

  const [showSidebar,setShowSidebar] = useContext(SideBarContext);
 
React.useEffect(() => {
  if(showSidebar==="left-20"){
    setmarginLeft("64");
  }
  else{
    setmarginLeft("0");
  }
})
  
  console.log(marginLeft);
  return (
    
      <div
        className="bg-gray-100 "
        style={{ paddingTop: "2px", height: "100%" }}
      >
        {isLogged || loginToken ? (
          <div>
            <Sidebar
              isLogged={isLogged}
              setisLogged={setisLogged}
              setloginToken={setloginToken}
             
            />
            {console.log("Inside",showSidebar)}
            <div className ={`ml-2`} style={{marginLeft:`${showSidebar==="left-0"?"250px":"42px"}`}}>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/Users" component={Users} />
                <Route
                  exact
                  path="/Users/Userdetails/:uid"
                  component={UserDetails}
                />
                <Route
                  exact
                  path="/Users/Userdetails/:uid/Edituser"
                  component={EditUser}
                />
                <Route
                  exact
                  path="/Users/Userdetails/:uid/Medicalhistory"
                  component={MedicalDetails}
                />
                <Route exact path="/aitrack" component={Aitrack} />
                <Route
                  exact
                  path="/aitrack/capturedetails/:uid"
                  component={CaptureDetails}
                />
                <Route
                  exact
                  path="/detect/capturedetails"
                  component={CaptureDetails}
                />
                <Route exact path="/detect" component={Detect} />

                <Redirect from="*" to="/Users" />
              </Switch>
            </div>
          </div>
        ) : (
          <Login isLogged={isLogged} setisLogged={setisLogged} />
        )}
      </div>
    
  );
}

export default App;
