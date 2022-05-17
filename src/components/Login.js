/** @format */

import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import validator from "validator";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Checkbox from '@mui/material/Checkbox';
import Input from "@material-ui/core/Input";

function Login({ isLogged, setisLogged }) {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    
    setValues({ ...values, [prop]: event.target.value });
  };

  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(false);
  const [paste, setPaste] = useState("");
  const [isPaste, setisPaste] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const validateEmail = (e) => {
    if (!isPaste) {
      setEmail(e.target.value);
      if (
        validator.isEmail(email, {
          require_tld: false,
        })
      ) {
        setEmailError("");
      } else {
        setEmailError("Please enter a valid email address");
      }
    }
  };
  const validateEmailPaste = (email) => {
    setEmail(email);
    if (
      validator.isEmail(email, {
        require_tld: false,
      })
    ) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
    }
    setisPaste(false);
  };
  const validatePassword = (e) => {
    setPassError("");
    setPass(e.target.value);
  };

  const toggleError = () => {
    setShowError(!true);
  };

  let webApiUrl = "https://apis.toothfairyapp.co.uk/api/auth/login";
  let tokenStr = "123456";

  var data = {
    role: "admin",
    email: email,
    password: pass,
    device: {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(data);
    if (emailError != "" || email == "" || pass == "") {
      setShowError(false);
     pass==""?setPassError("Please enter password"):null;
     email==""?setEmailError("Please enter email address"):null;
      
    } else {
      
      await axios
        .post(webApiUrl, data)
        .then((res) => {
          setUser(res.data.data.user);
          localStorage.setItem("token", res.data.data.token.token);
          localStorage.setItem("LoggedUserData", JSON.stringify(res.data.data.user));
          setloading(false);
          setisLogged(true);
        })
        .catch((err) => {
          console.error("Error", err.response.data.message);
          setShowError(true);
          if(err.response.data.message=="Please enter correct password"){
              setErrorMessage("You have entered invalid email address or password");
          }
          else{
            setErrorMessage("Email or password does not match our record");
          }
          
        });
    }
  };

  return (
    <div className="bg-white pt-4">
      <div className="font-sans mt-20 h-screen">
        <div className="max-w-sm mx-auto px-6">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <div className="mt-6">
                <div className="text-start pl-1 font-semibold text-black text-3xl">
                  <h1 style={{ fontFamily: "Epilogue", fontSize: "32px",lineHeight:'40px',fontWeight:'500px',fontStyle:'normal' }}>
                    Login to <br></br>Admin Panel{" "}
                  </h1>
                </div>
                <div className="pb-1  text-left font-base text-gray-700 w-full">
                  <span
                    className="text-sm text-gray-500"
                    style={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "400px",
                      lineHeight: "20px",
                    }}
                  >
                    Use you email and password
                    <br /> to login to Admin Panel
                  </span>
                </div>

                <form style={{ marginTop: "50px" }} autoComplete="off">
                  <div className="mx-auto max-w-lg">
                    <div className="py-2">
                      <span
                        style={{
                          fontFamily: "Epilogue",
                          color: "black",
                          fontSize: "18px",
                          fontWeight: "500px",
                        }}
                        className="px-1 text-sm text-gray-600"
                      >
                        Email
                      </span>
                      <input
                        id="userEmail"
                        autoCapitalize="off"
                        required
                        value={email}
                        onPaste={(e) => setisPaste(true)}
                        onChange={(e) =>
                          isPaste
                            ? validateEmailPaste(e.target.value)
                            : validateEmail(e)
                        }
                        placeholder="Enter email address..."
                        type="email"
                        className="text-md block focus:border-gray-600 block border-2  px-3 py-3  rounded-lg w-full  bg-gray-200 border-2 border-gray-200  placeholder-gray-400  focus:placeholder-gray-400   focus:outline-none bg-gray"
                      />
                      <p className="text-red-500 ml-2">{emailError}</p>
                    </div>
                    <div className="py-2 relativ content-center">
                      <span
                        style={{
                          fontFamily: "Epilogue",
                          color: "black",
                          fontSize: "18px",
                          fontWeight: "500px",
                        }}
                        className="px-1 text-sm text-gray-600"
                      >
                        Password
                      </span>
                      <div className="relative">
                        <input
                          type={values.showPassword ? "text" : "password"}
                          onChange={handlePasswordChange("password")}
                          value={values.password}
                          placeholder="Enter password..."
                          required
                          value={pass}
                          onChange={validatePassword}
                          className="text-md block focus:border-gray-600 block border-2  px-3 py-3  rounded-lg w-full  bg-gray-200 border-2 border-gray-200  placeholder-gray-400  focus:placeholder-gray-400   focus:outline-none bg-gray"
                        />
                        <p className="text-red-500 ml-2">{passError}</p>
                        <div
                          className="absolute right-0 top-0"
                          style={{ marginTop: "3px" }}
                        >
                          <IconButton
                            style={{
                              backgroundColor: "transparent",
                              outline: "none",
                            }}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-center" style={{marginBottom:'48px'}}>
                    
                        <Checkbox
                          sx={{color:'black',marginRight:'0px',width:'24px',height:'24px',padding:'0px',marginRight:'5px'}}
                          defaultChecked color="default"
                        />{" "}
                        <span
                          style={{
                            fontFamily: "Epilogue",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "20px",
                            color: "#757575",
                            marginBottom: "2px",
                           
                          }}
                          className="text-sm text-gray-600 leading-snug mt-2"
                        >
                          {" "}
                          Remember me{" "}
                        </span>
                      
                    </div>{" "}
                    <Link to="/dashboard">
                      <button
                        type="submit"
                        style={{
                          fontFamily: "Epilogue",
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "24px",
                          height: "56px",
                        }}
                        // onClick="ValidateForm"
                        className="mt-3 text-lg font-semibold 
                          bg-black w-full text-white rounded-lg
                          px-6 py-3 block shadow-sm hover:text-white hover:bg-black"
                        onClick={handleSubmit}
                      >
                        LOGIN
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {showError ? (
            <div className="m-2 " style ={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'300px'}} >
              <div
                className="relative py-3 pl-4 font-bold pr-10  text-red-600 rounded-lg"
                role="alert"
                
              >
                <p style={{width:'600px'}}>{ErrorMessage}</p>
                
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
