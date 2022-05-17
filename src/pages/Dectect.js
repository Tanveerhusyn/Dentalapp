/** @format */

import React, { useState, Fragment, forwardRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MaterialTable from '@material-table/core';
import {MTableToolbar} from '@material-table/core'
import {
  Avatar,
  InputBase,
  IconButton,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { ArrowDropDownSharp } from "@mui/icons-material";

import DropdownLink from "@material-tailwind/react/DropdownLink";
import { ImCross } from "react-icons/im";
import { AiOutlineCloudDownload } from "react-icons/ai";

import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { saveAs } from "file-saver";
import Vector from "assets/Vector.svg";


// className=" h-screen w-full mt-20 "
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
// className=" h-screen w-full mt-20 "

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Detect() {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [caro, setCaro] = useState(true);
  const [anchorEll, setAnchorEll] = React.useState(null);

  const open2 = Boolean(anchorEll);
  const handleClose2 = (event) => {
    event.preventDefault();
    setAnchorEll(null);
  };

  function Item(props) {
    return (
      <Paper>
        <div className="bg-red-400 relative  ">
          <img src={props.item.img1} />
          <div
            onClick={handleClose2}
            className="absolute top-0 right-0  flex flex-row mx-4 my-2 text-white bg-red"
          >
            <IconButton
              style={{
                zIndex: "999",
                backgroundColor: "transparent",
                outline: "none",
              }}
              onClick={() => {
                saveAs(props.item.img1, "image.jpg"); // Put your image url here.
              }}
            >
              <AiOutlineCloudDownload
                style={{ color: "white", outline: "none", marginTop: "10px" }}
                className="text-3xl  cursor-pointer"
              />
            </IconButton>
            <IconButton
              style={{
                zIndex: "999",
                backgroundColor: "transparent",
                outline: "none",
              }}
              onClick={handleClose2}
            >
              <ImCross
                style={{ color: "white", outline: "none" }}
                className="text-sm mt-2  mr-4 cursor-pointer"
              />
            </IconButton>
          </div>
        </div>
      </Paper>
    );
  }

  var items = [
    {
      img1: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      img1: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showError, setShowError] = React.useState(null);
  const [hidden, setHidden] = React.useState("visible");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setHidden("hidden");
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    setAnchorEll(event.currentTarget);
  };
  const handleClose = () => {
    setHidden("visible");
    setAnchorEl(null);
  };
  const handleYes = (event) => {
    // setHidden('visible');

    event.preventDefault();
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
    setAnchorEl(null);
  };

  const [showModal, setShowModal] = React.useState(false);

  const handleMenuClick = () => {
    // e.preventDefault();
  };

  return (
    <div
      style={{
        height: "20vh",
        marginTop: "30px",
        marginLeft: "5px",
        marginRight: "15px",
      }}
    >
      <div className="lg:flex flex-col justify-between text-white md:flex-row ">
        <div style={{ width: "250px" }}>
        <Paper
            elevation={0}
            sx={{ boxShadow: "none", border: "1px solid #E5E5EA",width:'293px',height:'56px', marginBottom:'10px' }}
            component="form"
            className="flex items-center shadow-none"
          >
            <IconButton sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1,fontFamily:'Epilogue',fontSize:'14px',lineHeight:'28px' }}
              placeholder="Search here..."
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </div>
      </div>

      <MaterialTable

      
  components={{
    Toolbar: props => (
    <div style={{ height:'1px' }}>
      
    <MTableToolbar {...props} />
    </div>
    
    ),
    }}
        style={{ boxShadow: "none", border: "1px solid #E5E5EA" }}
        icons={{
          SortArrow: forwardRef((props, ref) => (
            <ArrowDropDownSharp sx={{ color: "black" }} {...props} ref={ref} />
          )),
        }}
        title=""
        options={{
          search: false,
          searchFieldAlignment: "left",
          searchFieldStyle: {
            background: "gray",
          },
          actionsColumnIndex: -1,
          headerStyle: {
            position: "sticky", paddingLeft: "15px",fontFamily: 'Epilogue',fontWeight:'500px',fontSize:'14px',lineHeight:'28px',
          },
          rowStyle: {
            fontFamily:'Open sans',
            fontSize:'14px',
            
          },
        }}

        // actions={[

        //   rowData => ({
        //     icon: "⋮",
        //     tooltip: 'Details',
        //     onClick: (event, rowData) => {
        //       return (<DialogBox/>)}
        //   })]}

        columns={[
          {
            title: "First Name",
            field: "",
            render: (rowData) => (
              <div className="flex items-center">
                <Avatar src={rowData.imageUrl} className="mr-2" />
                <h1>{rowData.name}</h1>
              </div>
            ),
            cellStyle: {
              minWidth: "150px",
              paddingRight: "30px",
            },
          },

          {
            title: "Last Name",
            field: "lastName",
            cellStyle: {
              minWidth: "150px",
            },
          },
          {
            title: "Email Address",
            field: "Email",
            cellStyle: {
              minWidth: "150px",
            },
          },
          {
            title: "Captures",
            field: "captures",
            render: (rowData) => (
              <div>
                <a
                  onClick={handleClick2}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {rowData.captures}
                </a>
                <Dialog
                   BackdropProps={{
                    style: { backgroundColor: "rgba(0,0,0,0.03)", },
                  }}
                  sx={{
                    "& .MuiDialog-container .MuiPaper-root": {
                      boxShadow: "none",
                     
                    
                    },
                  }}
                  open={open2}
                  maxWidth="md"
                  onClose={handleClose2}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <Carousel navButtonsAlwaysVisible={true} animation="slide">
                    {items.map((item, i) => (
                      <Item key={i} item={item} />
                    ))}
                  </Carousel>
                </Dialog>
              </div>
            ),
            cellStyle: {
              minWidth: "150px",
            },
          },

          {
            title: "Capture Date & Time",
            field: "createdOn",
            cellStyle: {
              minWidth: "210px",
            },
          },
          {
            title: "",
            field: "actions",
            render: (rowData) => (
              <div>
                {/* <IconButton onClick={handleButton}><MoreVert/></IconButton> */}
                <Menu as="div" className="relative inline-block  text-left ">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md  px-4 py-2 bg-grey-100 text-sm font-medium text-gray-700  focus:outline-none">
                      <MoreVert
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-md  bg-white ring-1 ring-black ring-opacity-5 w-40 focus:outline-none">
                      <div className="py-1">
                        <Link to="/detect/capturedetails">
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                View Capture Details
                              </p>
                            )}
                          </Menu.Item>
                        </Link>
                        <Link to="/edituser"></Link>
                        <Menu.Item>
                          {({ active }) => (
                            <p
                             
                              onClick={handleClick2}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              View images
                            </p>
                          )}
                        </Menu.Item>
                        <div>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                style={{ color: "red" }}
                                onClick={handleClick}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-red-500"
                                    : "text-gray-700",
                                  "block w-full text-left px-4 py-2 text-sm"
                                )}
                              >
                                Remove Record
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Dialog
                  BackdropProps={{
                    style: { backgroundColor: "rgba(0,0,0,0.03)" },
                  }}
                  sx={{
                    "& .MuiDialog-container .MuiPaper-root": {
                      boxShadow: "none",
                      height: "37%",
                      borderRadius: "15px",
                      paddingTop: "20px",
                    },
                  }}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                  </DialogTitle>
                  <DialogContent sx={{ overflow: "hidden" }}>
                    <DialogContentText id="alert-dialog-description">
                      All information related to the user will be removed. You
                      can still see the information linked to that user in other
                      section of the application. Click 'Yes' to delete or 'No'
                      to cacncel the action.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      style={{ height: "40px", width: "80px", margin: "0px" }}
                      onClick={handleClose}
                    >
                      No
                    </Button>
                    <Button
                      style={{
                        background: "black",
                        height: "40px",
                        width: "80px",
                        color: "white",
                        margin: "20px",
                      }}
                      onClick={handleYes}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <div>
                  {/* <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      User will not longer be able to access the account if you
                      deactivate it. Click "Yes" to deactivate or "No" to cancel
                      the action.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      style={{ height: "40px", width: "80px", margin: "0px" }}
                      onClick={handleClose}
                    >
                      No
                    </Button>
                    <Button
                      style={{
                        background: "black",
                        height: "40px",
                        width: "80px",
                        color: "white",
                        margin: "20px",
                      }}
                      onClick={handleClose}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog> */}
                </div>
              </div>
            ),
            cellStyle: {
              paddingRight: "50px",
            },
          },
        ]}
        // className={` mx-4 px-4 py-2 text-base rounded-full text-${rowData.ProfileStatus=="incomplete"?"yellow":"gray"}-600 border border-${rowData.ProfileStatus=="incomplete"?"yellow":"gray"}-600`}

        data={[
          {
            name: "Jason",
            lastName: "Brady",
            Email: "jason@toothfairyapp.co.uk",
            createdOn: "25-10-2021 11:18:00",

            imageUrl:
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",

            captures: "View images",
          },
          {
            name: "Kumar",
            lastName: "Ariz",
            Email: "kumar@toothfairyapp.co.uk",
            createdOn: "25-10-2021 11:18:00",
            captures: "View images",

            imageUrl:
              "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          },
          {
            name: "Kireten",
            lastName: "Morrison",
            Email: "kriten@toothfairyapp.co.uk",
            captures: "View images",
            createdOn: "25-10-2021 11:18:00",
            imageUrl:
              "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          },
          {
            name: "Jason",
            lastName: "Brady",
            Email: "jason@toothfairyapp.co.uk",
            captures: "View images",
            createdOn: "25-10-2021 11:18:00",
            imageUrl:
              "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
          },
        ]}
      />
      <>
        {showError ? (
          <div
            className="fixed top-0 left-0 z-50 py-3  pl-2 leading-normal   rounded-lg text-black"
            role="alert"
            style={{
              marginTop: "41%",
            marginLeft: "10px",
            color: "#fff",
            width: "245px",
            background: "#05944f",
            }}
          >
            <p>Record removed</p>
            <span
              className="absolute inset-y-0 right-0 text-white flex items-center mr-4 cursor-pointer"
              onClick={() => setShowError(false)}
            >
              <img src={Vector} alt="" onClick={() => setShowError(false)} />
              {/* <svg
             className="w-4 h-4 text-white fill-current"
             style={{ color: "#fff" }}
             role="button"
             viewBox="0 0 20 20"
            
           >
             <path
               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
               clip-rule="evenodd"
               fill-rule="evenodd"
             ></path>
           </svg> */}
            </span>
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
}
