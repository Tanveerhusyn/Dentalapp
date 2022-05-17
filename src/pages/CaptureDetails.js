import React from "react";

import { useLocation } from "react-router-dom";
import axios from "axios";

function CaptureDetails() {
  const state = useLocation().state;
  
  const [user, setUser] = React.useState([]);
  const [createdAt, setCreatedAt] = React.useState();
  const [pictures, setPictures] = React.useState([]);
  const [UserDetails, setUserDetails] = React.useState([]);
  const role = "patient";
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [day,month,year].join('-');
  }

  var myDate;
  var FullDate = "";
  //For single user details use this API

  let webAPI = `https://apis.toothfairyapp.co.uk/api/admins/get-answer/ai/${state.id2}`;
  React.useEffect(() => {
    async function api() {
      axios
        .get(webAPI, config)
        .then((res) => {
          setUser(res.data.data.answers);
          
          setPictures(res.data.data.attachments);

          setCreatedAt(formatDate(res.data.data.createdAt));
        })
        .catch((e) => console.log(e));
    }
    api();
  }, []);

 


  React.useEffect(() => {
    async function apiCall() {      
      await axios 
      .get(`https://apis.toothfairyapp.co.uk/api/admins/user/${role}/${state.id}`, config )
        .then((res) => {
        
          setUserDetails(res.data.data.user);     
         
        })
        .catch((err) => {
          console.error(err);
        });
      }
        apiCall();  
      },[]);


  //For All users details use this API...
  

var myDate = new Date(UserDetails.dob);
let DOB  = `${myDate.getDay()+1}/${myDate.getMonth()+1}/${myDate.getFullYear()}`


  return (
    <div className="flex mx-auto w-80 mx-2 md:w-710 lg:w-710 justify-center ">
      {
        UserDetails.length!==0?      <div className="bg-white rounded   w-full h-full py-2">
        <div className=" flex flex-row justify-between border-b p-2">
          <div>
            <p style={{ fontFamily: "Epilogue", fontSize: "14px" }}>
              Capture Details
            </p>
          </div>
          <div
            style={{
              fontFamily: "Epilogue",
              fontSize: "14px",
              color: "#8a8a8e",
              lineHeight: "14pxs",
            }}
            className=""
          >
            {createdAt}
          </div>
        </div>

        <div className="pb-5  mb-1 border-b">
          <div>
            <p
              className="p-3"
              style={{
                fontFamily: "Epilogue",
                color: "#aeaeb2",
                fontSize: "12px",
              }}
            >
              Captures
            </p>
          </div>

          <div className="flex flex-col  lg:flex-row mx-3">
            <div
              style={{ margin: "3px", marginBottom: "30px", height: "240px" }}
            >
              <img
                alt="gallery"
                className="h-full"
                // className="block object-cover object-center w-full h-full rounded-lg"
                src={`${pictures[0] ? pictures[0].url : "null"}`}
              />
              <p
                style={{
                  color: "rgba(60,60,60,0.6)",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                  lineHeight: "19px",
                  margin: "10px 0px",
                }}
              >
                Upper
              </p>
            </div>
            <div
              style={{ margin: "3px", height: "240px", marginBottom: "30px" }}
            >
              <img
                alt="gallery"
                className="h-full"
                // className="block object-cover object-center w-full h-full rounded-lg"
                src={`${pictures[1] ? pictures[1].url : "null"}`} 
                
              />
              <p
                style={{
                  color: "rgba(60,60,60,0.6)",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                  lineHeight: "19px",
                  margin: "10px 0px",
                }}
              >
                Middle
              </p>
            </div>
            <div
              style={{ margin: "3px", height: "240px", marginBottom: "30px" }}
            >
              <img
                alt="gallery"
                className="h-full"
                // className="block object-cover object-center w-full h-full rounded-lg"
                src={`${pictures[2] ? pictures[2].url : "null"}`}
              />
              <p
                style={{
                  color: "rgba(60,60,60,0.6)",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                  lineHeight: "19px",
                  margin: "10px 0px",
                }}
              >
                Lower
              </p>
            </div>
          </div>
        </div>

        <p
          className="p-3"
          style={{
            fontFamily: "Epilogue",
            fontStyle: "normal",
            color: "#aeaeb2",
            fontSize: "12px",
          }}
        >
          Treatment Tracking
        </p>

        {user &&
          user.map((item, index) => (
            <div className=" p-3 border-b">
              <p
                style={{
                  fontFamily: "Open Sans",
                  fontWeight: "normal",
                  fontSize: "14px",
                  lineHeight: "19px",
                  color: "rgba(60,60,67,0.6)",
                }}
              >
                {item.question}
              </p>
              <div className="flex flex-row justify-between mb-1 mt-2 ">
                <p
                  style={{
                    color: "black",
                    fontFamily: "Open Sans",
                    fontWeight: "normal",
                    lineHeight: "19px",
                    fontSize: "14px",
                  }}
                >
                  {item.answer}
                </p>
                <p
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "rgba(60,60,67,0.6)",
                  }}
                >
                  Answer
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p
                  style={{
                    color: "black",
                    fontFamily: "Open Sans",
                    fontWeight: "normal",
                    lineHeight: "19px",
                    fontSize: "14px",
                  }}
                >
                  {item.description}
                </p>
                <p
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "rgba(60,60,67,0.6)",
                  }}
                >
                  Note
                </p>
              </div>
            </div>
          ))}

        <p
          style={{
            fontFamily: "Epilogue",
            fontStyle: "normal",
            color: "#aeaeb2",
            fontSize: "12px",
          }}
          className=" p-3 "
        >
          User Details
        </p>

        <div className=" p-3 border-b">
          <div className="flex flex-row justify-between mb-1 mt-2">
            <p
              style={{
                color: "black",
                fontFamily: "Open Sans",
                fontWeight: "normal",
                lineHeight: "19px",
                fontSize: "14px",
              }}
            >
              {UserDetails.firstName} {UserDetails.lastName}
            </p>
            <p
              style={{
                fontFamily: "Open Sans",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "19px",
                color: "rgba(60,60,67,0.6)",
              }}
            >
              Full name
            </p>
          </div>
        </div>
        <div className=" p-3 border-b">
          <div className="flex flex-row justify-between mb-1 mt-2">
            <p
              style={{
                color: "black",
                fontFamily: "Open Sans",
                fontWeight: "normal",
                lineHeight: "19px",
                fontSize: "14px",
              }}
            >
             {formatDate(UserDetails.dob)}
            </p>
            <p
              style={{
                fontFamily: "Open Sans",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "19px",
                color: "rgba(60,60,67,0.6)",
              }}
            >
              Date of birth
            </p>
          </div>
        </div>

        <div className=" p-3 border-b">
          <div className="flex flex-row justify-between mb-1 mt-2">
            <p
              style={{
                color: "black",
                fontFamily: "Open Sans",
                fontWeight: "normal",
                lineHeight: "19px",
                fontSize: "14px",
              }}
            >
             {UserDetails.gender}
            </p>
            <p
              style={{
                fontFamily: "Open Sans",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "19px",
                color: "rgba(60,60,67,0.6)",
              }}
            >
              Gender
            </p>
          </div>
        </div>

        <div className=" p-3 border-b">
          <div className="flex flex-row justify-between mb-1 mt-2">
            <div>
              <p
                style={{
                  color: "black",
                  fontFamily: "Open Sans",
                  fontWeight: "normal",
                  lineHeight: "19px",
                  fontSize: "14px",
                }}
              >
                {UserDetails.address.formattedAddress}
              </p>
              <p
                style={{
                  color: "black",
                  fontFamily: "Open Sans",
                  fontWeight: "normal",
                  lineHeight: "19px",
                  fontSize: "14px",
                }}
              >
                
              </p>
              <p
                style={{
                  color: "black",
                  fontFamily: "Open Sans",
                  fontWeight: "normal",
                  lineHeight: "19px",
                  fontSize: "14px",
                }}
              >
                {UserDetails.address.country}
              </p>
            </div>
            <p
              style={{
                fontFamily: "Open Sans",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "19px",
                color: "rgba(60,60,67,0.6)",
              }}
            >
              Address
            </p>
          </div>
        </div>

        <div className=" p-3 border-b">
          <div className="flex flex-row justify-between mb-1 mt-2">
            <p
              style={{
                color: "black",
                fontFamily: "Open Sans",
                fontWeight: "normal",
                lineHeight: "19px",
                fontSize: "14px",
              }}
            >
              {UserDetails.email}
            </p>
            <p
              style={{
                fontFamily: "Open Sans",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "19px",
                color: "rgba(60,60,67,0.6)",
              }}
            >
              Email address
            </p>
          </div>
        </div>

        <div className=" p-3 border-b">
          <div className="flex flex-row justify-between mb-1 mt-2">
            <p
              style={{
                color: "black",
                fontFamily: "Open Sans",
                fontWeight: "normal",
                lineHeight: "19px",
                fontSize: "14px",
              }}
            >
              {UserDetails.mobile}
            </p>
            <p
              style={{
                fontFamily: "Open Sans",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "19px",
                color: "rgba(60,60,67,0.6)",
              }}
            >
              Contact number
            </p>
          </div>
        </div>
      </div>:<div></div>
      }
    </div>
  );
}

export default CaptureDetails;
