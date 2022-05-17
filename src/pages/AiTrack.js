import React, { useState, Fragment, forwardRef, useEffect } from "react";
import { saveAs } from "file-saver";
import {
  ArrowDropDownSharp,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";
import Vector from "../assets/Vector.svg";
import axios from "axios";
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
  CircularProgress,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { ImCross } from "react-icons/im";
import { AiOutlineCloudDownload } from "react-icons/ai";

import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

// className=" h-screen w-full mt-20 "
import { Menu, Transition } from "@headlessui/react";
// className=" h-screen w-full mt-20 "

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Aitrack() {
  // const [open, setOpen] = useState(false);
  const [Search, setSearch] = useState("");
  const [role, setRole] = useState("patient");
  const [type, setType] = useState("ai");
  const [userPerpage, setuserPerpage] = useState([5, 10, 20, 30, 40]);
  const [pageSize, setPageSize] = useState(5);
  const [skip, setSkip] = useState(0);
  const [flag, setFlag] = useState(false);
  const [isSearch, setisSearch] = useState(false);
  const [allUserLength, setallUserLength] = useState(141);
  const [searchString, setSearchString] = useState("");
  const [pageCount, setPageCount] = React.useState(0);
  const [pictures, setPictures] = useState([]);
  const [loaded, setLoaded] = useState(false);
  

  console.log("Token", localStorage.getItem("token"));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  //For single user details use this API
  // let webAPI =  `http://18.133.73.98:5000/api/admins/get-answer/ai/616566b5be9d4b5170dc7807`

  //For All users details use this API...
  // let webAPI =  `http://18.133.73.98:5000/api/admins/patient-answers/ai/{_id}/{search}/0/10`
  // React.useEffect(()=>{
  //   async function api(){
  //     axios.get(webAPI, config).then((res)=>{
  //       console.log("AI data", res)
  //     }).catch(e=>console.log(e))
  //   }
  //  api()
  // },[])

  let tableRef = React.createRef();

  function handleSearch(event) {
    event.preventDefault();

    if (event.target.value == "") {
      setisSearch(false);
      tableRef.current.onQueryChange();
    } else {
      setSearchString(event.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearch(searchString);

    if (searchString == "") {
      setisSearch(false);
      tableRef.current.onQueryChange();
    } else {
      setisSearch(true);
      tableRef.current.onQueryChange();
    }
  };

  const handleData = (query) => {
    return new Promise((resolve, reject) => {
      let webApi = "";

      if (isSearch) {
        webApi = `https://apis.toothfairyapp.co.uk/api/admins/patient-answers/${type}/{_id}/${Search}/${skip}/${pageSize}`;
      } else {
        webApi = `https://apis.toothfairyapp.co.uk/api/admins/patient-answers/${type}/{_id}/{search}/${skip}/${pageSize}`;
      }

      axios
        .get(webApi, config)
        .then((res) => {
          
          setuserPerpage([5, 10, 30, 40, res.data.data.meta.total]);
          setPageCount(res.data.data.meta.page);
          console.log("Main Page", res.data.data);
          resolve({
            data: res.data.data.data,
            page: res.data.data.meta.page - 1,
            totalCount: res.data.data.meta.total,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  const [anchorEll, setAnchorEll] = React.useState(null);
  const imgElement = React.useRef(null);

  const open2 = Boolean(anchorEll);
  const handleClose2 = (event) => {
    event.preventDefault();
    setAnchorEll(null);
  };

  function Item(props) {
    console.log("props", props.item.url);
    return (
      <Paper >
        <div className="relative ">
          <div>
          <img   ref={imgElement} style ={{maxWidht:'900px',maxHeight:'550px',display:`${loaded?"block":"none"}`}} src={props.item.url} onLoad={() =>{
            console.log("loaded",imgElement.current.naturalWidth,imgElement.current.naturalHeight)
            setLoaded(true)
          }} />
          {
            !loaded?<CircularProgress/>:null
          }
          </div>
          <div
            className="absolute top-0 right-0  flex flex-row mx-4 my-2 text-white bg-red"
            style={{ margin: "5px" }}
          >
            <IconButton
              style={{
                zIndex: "999",
                backgroundColor: "transparent",
                outline: "none",
              }}
              onClick={() => {
                saveAs(props.item.url, "image.jpg"); // Put your image url here.
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
      url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      url: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showError, setShowError] = React.useState(null);

  const [hidden, setHidden] = React.useState("visible");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    setHidden("hidden");
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    setAnchorEll(event.currentTarget);
  };
  const handleClose = (event) => {
    event.preventDefault();
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
            sx={{
              boxShadow: "none",
              border: "1px solid #E5E5EA",
              width: "293px",
              height: "56px",
              marginBottom: "10px",
            }}
            component="form"
            className="flex items-center shadow-none"
            onSubmit={handleSubmit}
          >
            <IconButton sx={{ p:'5px',paddingRight:'1px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              onChange={handleSearch}
              sx={{
                ml: 1,
                flex: 1,
                fontFamily: "Epilogue",
                fontSize: "14px",
                lineHeight: "28px",
                paddingTop: "5px",
              }}
              placeholder="Search here..."
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </div>
      </div>

      <MaterialTable
        tableRef={tableRef}
        components={{
          Toolbar: (props) => (
            <div style={{ height: "1px" }}>
              <MTableToolbar {...props} />
            </div>
          ),
          Pagination: (subProps) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "15px 10px",
                }}
              >
                <div style={{ marginRight: "15px" }}> Showing results </div>
                <select
                  value={pageSize}
                  style={{
                    padding: "5px",
                    border: "none",
                    outline: "none",
                    margin: "0 10px",
                  }}
                  className="bg-gray-100"
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    tableRef.current.onQueryChange();
                  }}
                >
                  {userPerpage.map((pageSize) => (
                    <option
                      style={{
                        background: "#fff",
                        border: "0px",
                        outline: "0px",
                        boxShadow: "0 5px 10px -2px rgba(0,0,0,.16)",
                      }}
                      key={pageSize}
                      value={pageSize}
                    >
                      {pageSize}
                    </option>
                  ))}
                </select>
                <IconButton
                  disabled={pageCount <= 1}
                  onClick={(e) => {
                    if (flag && pageSize >= 0) {
                      setSkip(
                        (prev) => prev - (subProps.count - pageSize * pageCount)
                      );
                      setFlag(false);
                    } else {
                      pageSize >= 0 ? setSkip((prev) => prev - pageSize) : null;
                    }
                    tableRef.current.onQueryChange();
                  }}
                  style={{
                    margin: "0 10px",
                    color: "black",
                    width: "30px",
                    background: "transparent",
                    outline: "none",
                  }}
                >
                  <NavigateBefore
                    style={{ color: `${pageCount <= 1 ? "gray" : "black"}` }}
                  />
                </IconButton>
                <div>
                  <em>
                    {flag
                      ? `${
                          pageCount * pageSize +
                          (subProps.count - pageSize * pageCount)
                        } out of ${subProps.count}`
                      : `${pageCount * pageSize} out of ${subProps.count}`}
                  </em>
                </div>

                <IconButton
                  disabled={flag}
                  onClick={(e) => {
                    pageSize * pageCount + pageSize < subProps.count
                      ? setSkip((prev) => prev + pageSize)
                      : setSkip((prev) => {
                          setFlag(true);
                          return prev + (subProps.count - pageSize * pageCount);
                        });
                    tableRef.current.onQueryChange();
                  }}
                  style={{
                    margin: "0 10px",
                    color: "black",
                    width: "30px",
                    background: "transparent",
                    outline: "none",
                  }}
                >
                  <NavigateNext
                    style={{
                      color: `${flag ? "gray" : "black"}`,
                    }}
                  />
                </IconButton>
              </div>
            );
          },
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
          rowStyle: {
            fontFamily: "Open sans",
            fontSize: "14px",
          },

          headerStyle: {
            position: "sticky",
            paddingLeft: "15px",
            fontFamily: "Epilogue",
            fontWeight: "500px",
            fontSize: "14px",
            lineHeight: "28px",
          },
          actionsColumnIndex: -1,
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
            field: "name",
            render: (rowData) => {
              return (
                <div className="flex items-center">
                  <Avatar
                    src={rowData.patient[0].profileImage}
                    className="mr-2"
                  />
                  <h1>{rowData.patient[0].firstName}</h1>
                </div>
              );
            },
            cellStyle: {
              minWidth: "150px",
              paddingRight: "30px",
            },
          },

          {
            title: "Last Name",
            field: "lastName",
            render: (rowData) => (
              <div>
                <h1>{rowData.patient[0].lastName}</h1>
              </div>
            ),
            cellStyle: {
              minWidth: "150px",
            },
          },
          {
            title: "Email Address",
            field: "email",

            render: (rowData) => (
              <div>
                <h1>{rowData.patient[0].email}</h1>
              </div>
            ),
          },
          {
            title: "Captures",
            field: "captures",
            render: (rowData) => {
              setPictures(rowData.attachments);
              

             
              return (
                <div>
                  <a
                    onClick={handleClick2}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    View images
                  </a>
                  <Dialog
                    BackdropProps={{
                      style: { backgroundColor: "rgba(0,0,0,0.03)" },
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
                   <div style ={{background:'red',width:'900px',height:'800px'}}>
                   <Carousel
                      navButtonsAlwaysInvisible={!loaded}
                      next={()=>setLoaded(!loaded)}
                      indicators={false}
                      autoPlay={false}
                      navButtonsAlwaysVisible={true}
                      animation="slide"
                    >
                      {pictures.map((item, i) => {
                        console.log("Pictures", i);
                        return <Item key={i} item={item} />;
                      })}
                    </Carousel>
                   </div>
                  </Dialog>
                </div>
              );
            },
            cellStyle: {
              minWidth: "225px",
            },
          },

          {
            title: "Capture Date & Time",
            field: "createdAt",
            cellStyle: {
              minWidth: "220px",
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
                        <Link
                          to={{
                            pathname: `/aitrack/capturedetails/${rowData.patient[0]._id}`,
                            state: {
                              id: rowData.patient[0]._id,
                              firstName: rowData.patient[0].firstName,
                              role: role,
                              id2: rowData._id,
                            },
                          }}
                        >
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
                              href="#"
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
                        {/* <form>
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
                        </form> */}
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
          },
        ]}
        // className={` mx-4 px-4 py-2 text-base rounded-full text-${rowData.ProfileStatus=="incomplete"?"yellow":"gray"}-600 border border-${rowData.ProfileStatus=="incomplete"?"yellow":"gray"}-600`}

        data={(query) => handleData(query)}
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
              <img  src={Vector} alt="" onClick={() => setShowError(false)} />
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
