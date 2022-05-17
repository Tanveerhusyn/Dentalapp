import { Avatar, IconButton, Divider } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";

import axios from "axios";

function EditUser() {
  const [loader, setLoader] = useState(false);
  const [Dob, setDob] = useState("");
  const history = useHistory();

  const { user, image } = useLocation().state;

  const [file, setFile] = useState(null);
  const [country, setCountry] = useState("");

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };

  console.log("State", image);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  var FullDate = "";

  React.useEffect(() => {
    var myDate = new Date(user.dob);
    FullDate = `${myDate.getFullYear()}-${
      myDate.getMonth() + 1
    }-${myDate.getDay()}`;
    console.log("Year", formatDate(FullDate));

    // var DateOfBirth = myDate.toLocaleDateString();
    // console.log("dat", DateOfBirth)
    setDob(formatDate(FullDate));
  }, []);

  const handleLoading = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };
  return (
    <div className="p-2  flex mx-auto md:w-710 justify-center">
      <div className=" mx-auto w-full md:w-screen  ">
        <div className="bg-white rounded    w-full h-full">
          <div className="text-gray-600 flex flex-col  ">
            <p
              className="text-lg p-4"
              style={{
                color: "black",
                fontFamily: "Epilogue",
                fontWeight: "500px",
                fontStyle: "normal",
                fontSize: "14px",
              }}
            >
              User Details
            </p>
            <Divider />
          </div>
          <div className="px-4">
            <div className="text-gray-400 mt-4 mb-2">
              <p
                style={{
                  color: "#aeaeb2",
                  fontFamily: "Epilogue",
                  fontWeight: "500px",
                  fontStyle: "normal",
                  fontSize: "12px",
                }}
              >
                Personal Details
              </p>
            </div>
            <div
              className="w-full bg-white flex justify-center px-3"
              style={{ marginBottom: "12px" }}
            >
              <div className="App">
                <input
                  type="file"
                  onChange={handleChange}
                  id="upload"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Avatar
                      id="avatar"
                      src={file}
                      style={{
                        width: "128px",
                        height: "128px",
                      }}
                    />
                  </IconButton>
                </label>
                <label htmlFor="avatar" />
              </div>
            </div>
            <Divider style={{ marginBottom: "12px" }} />
            <div className="flex flex-col md:flex-row mb-3 lg:flex-row content-start flex-wrape  w-full   justify-between ">
              <div className="flex-1 mr-3">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  First Name
                </label>
                <input
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  type="text"
                  id="FirstName"
                  className="h-10 border mt-1 rounded px-4 w-full  bg-gray-200"
                  value={user.firstName}
                />
              </div>
              <div className="flex-1  mb-3">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Last Name
                </label>
                <input
                  style={{
                    backgroundColor: "#F2F1F7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  type="text"
                  id="lastName"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                  value={user.lastName}
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col md:flex-row mb-3 lg:flex-row content-start flex-wrape  w-full   justify-between ">
              <div className=" flex-1 mr-3 ">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={(e) => setDob(e.target.value)}
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  value={Dob}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                />
              </div>
              <div className="flex-1 ml-3 mb-3 relative">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Gender
                </label>
                <svg
                  className="w-3 h-2 absolute text-black top-0 right-0 m-4 mt-10 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select
                  tyle={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  className="border border-gray-300 h-10 border mt-1 rounded px-4 w-full bg-gray-200  h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  <option defaultValue>Male </option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-3">
              <label
                style={{
                  color: "black",
                  fontFamily: "Epilogue",
                  fontWeight: "500px",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "24px",
                }}
              >
                Full Address
              </label>

              <div className="relative text-gray-600 focus-within:text-gray-400 mb-3">
                <span className="absolute inset-y-0 left-0 flex items-center  pb-2  ">
                  <button className="p-2 pr-3 text-gray-500 focus:outline-none ">
                    <svg
                      fill="none"
                      color="black"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 mr-3 pr-1"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  name="q"
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  className="h-10 border mt-1 mb-3 pl-8 rounded px-4 w-full bg-gray-200"
                  value={user.address.formattedAddress}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-3 lg:flex-row content-start flex-wrape  w-full   justify-between ">
              <div className=" flex-1 mr-3 ">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Lat
                </label>
                <input
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  id="lat"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                  value="91.121"
                />
              </div>
              <div className="flex-1 ml-3 mb-3">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Long
                </label>
                <input
                  id="long"
                  style={{ background: "#f2f1f7", color: "black" }}
                  className="h-10 border mt-1 text-black rounded px-4 w-full"
                  value="0.24234"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-3 lg:flex-row content-start flex-wrape  w-full  justify-between ">
              <div className=" flex-1 mr-3 ">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Flat, Floor & Street Name
                </label>
                <input
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  id="flat"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                  value={`${user.address.houseNo} ${user.address.street}`}
                />
              </div>
              <div className="flex-1 ml-3 mb-3">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Post Code
                </label>
                <input
                  type="text"
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  id="long"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                  value={user.address.postalCode}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-3 lg:flex-row content-start flex-wrape  w-full   justify-between ">
              <div className=" flex-1 mr-3 ">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  City
                </label>
                <input
                  type="text"
                  style={{
                    backgroundColor: "#f2f1f7",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: "normal",
                  }}
                  id="city"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                  value={user.address.city}
                />
              </div>
              <div className="flex-1 ml-3 mb-3 relative justify-center">
                <label
                  style={{
                    color: "black",
                    fontFamily: "Epilogue",
                    fontWeight: "500px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Country
                </label>

                <CountryDropdown
                style={{
                  backgroundColor: "#f2f1f7",
                  marginTop: "4px",
                  defaultOptionLabel: "United Kingdom",
                  borderRadius: "4px",
                  height: "40px",
                  color: "black",
                  fontSize: "14px",
                  lineHeight: "28px",
                  fontWeight: "normal",
                  paddingLeft: "4px",
                }}
                 
                  value={user.address.country}
                  onChange={(val) => setCountry(val)}
                />
              </div>
            </div>

            <div className="md:col-span-5">
              <label
                style={{
                  color: "black",
                  fontFamily: "Epilogue",
                  fontWeight: "500px",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "24px",
                }}
                className="mt-1"
              >
                Email Address
              </label>
              <input
                type="text"
                disabled
                style={{
                  backgroundColor: "#f2f1f7",
                  color: "black",
                  fontSize: "14px",
                  lineHeight: "28px",
                  fontWeight: "normal",
                }}
                name="email"
                id="email"
                className="h-10 border mt-1 mb-2 rounded px-4 w-full bg-gray-200 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={user.email}
              />
            </div>

            <div
              className="w-full "
              style={{
                color: "#fffff",
                fontFamily: "Epilogue",
                fontWeight: "normal",
                fontSize: "16px",
              }}
            >
              <div
                onClick={handleLoading}
                className="bg-black mt-2 cursor-pointer text-center hover:bg-black-400 text-white flex items-center justify-center rounded w-full"
                style={{ height: "48px" }}
              >
                {loader ? (
                  <button
                    className="btn btn-md  w-full loading"
                    style={{
                      borderRadius: "0px",
                      border: "none",
                      height: "49px",
                      background: "#D1D1D6",
                      color: "black",
                      fontFamily: "Epilogue",
                      fontWeight: "normal",
                      fontSize: "16px",
                    }}
                  ></button>
                ) : (
                  <p>Save</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
