/** @format */

import React, { useState, forwardRef, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import MaterialTable from "@material-table/core";
import {
  ArrowDropDownSharp,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import {
  MTableToolbar,
  MTableBodyRow,
  MTablePagination,
} from "@material-table/core";
import { Box } from "@mui/material";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Pagination } from "@mui/material";
import { TablePagination } from "@mui/material";

// className=" h-screen w-full mt-20 "

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Table() {
  const [dat, setDat] = useState();
  const [isSearch, setisSearch] = useState(false);
  const [allUserLength, setallUserLength] = useState(141);
  const [searchString, setSearchString] = useState("");
  const [Search, setSearch] = useState("");
  const [role, setRole] = useState("patient");
  const [userPerpage, setuserPerpage] = useState([20]);
  const [pageSize, setPageSize] = useState(20);
  const [skip, setSkip] = useState(0);
  const [flag,setFlag]=useState(false);
  const [CurrentImage, setCurrentImage] = useState("");

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

  function handleData(query) {
    return new Promise((resolve, reject) => {
      let webApi = "";
      
      if(isSearch){
        webApi =     `https://apis.toothfairyapp.co.uk/api/admins/users/${role}/${Search}/${skip}/${pageSize}`     ;
      }
      else{
        webApi =    `https://apis.toothfairyapp.co.uk/api/admins/users/${role}/{search}/${skip}/${pageSize}`     ;
      }

      axios
        .get(webApi, config)
        .then((res) => {
          
          setuserPerpage([5, 10,20, 30, 40, res.data.data.meta.total]);
          setPageCount(res.data.data.meta.page);
          
          resolve({
            data: query.orderBy && query.orderDirection
            ? _.orderBy(
              res.data.data.users,
                [query.orderBy.field],
                [query.orderDirection]
              )
            :res.data.data.users,
            page: res.data.data.meta.page - 1,
            totalCount: res.data.data.meta.total,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [pageCount, setPageCount] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 30));
    setPage(0);
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEll, setAnchorEll] = React.useState(null);
  const [hidden, setHidden] = React.useState("visible");
  const [hide, setHide] = React.useState("hidden");
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEll);
  const [showError, setShowError] = useState(false);
  const [showError2, setShowError2] = useState(false);
  const handleButton = (event) => {
    setHide("visible");
  };

  const handleClick = (event) => {
    // setHidden('hidden');
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    // setHidden('hidden');
    event.preventDefault();

    setAnchorEll(event.currentTarget);
  };
  const handleClose = (event) => {
    // setHidden('visible');

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
  const handleClose2 = (event) => {
    // setHidden('visible');
    event.preventDefault();
    setAnchorEll(null);
  };
  const handleYes2 = (event) => {
    // setHidden('visible');
    event.preventDefault();
    setShowError2(true);
    setTimeout(() => {
      setShowError2(false);
    }, 3000);
    setAnchorEll(null);
  };

  const handleMenuClick = () => {
    // e.preventDefault();
  };

 
  return (
    <div style={{ height: "100vh", width: "100%", marginTop: "100px" }}>
      <div className="lg:flex flex-col justify-between text-white md:flex-row ">
        <div style={{ width: "250px" }}>
          <Paper
            elevation={0}
            sx={{
              boxShadow: "none",
              border: "1px solid #E5E5EA",
              width: "293px",
              height: "56px",
            }}
            onSubmit={handleSubmit}
            className="flex items-center shadow-none mb-3"
            component="form"
          >
            <IconButton sx={{ p: "5px" }} aria-label="search">
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
              }}
              placeholder="Search here ..."
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </div>
        <div>
          {/* <button
            // onClick={handleSubmit}
            style={{
              height: "56px",
              fontFamily: "Epilogue",
              fontWeight: "500px",
              fontSize: "14px",
            }}
            className="w-72 md:w-64 mt-2 md:mt-0 text-lg bg-black text-white mb-3 px-6 py-3 block shadow-sm hover:text-white hover:bg-black"
          >
            Add New User
          </button> */}
        </div>
      </div>

      <MaterialTable
        tableRef={tableRef}
        // onPageChange={(event, page) => {
        //   console.log("EVENT", event.currentTarget);
        //   console.log("PAGE", page);

        //   if (skip >= 0 && skip <= 141) {
        //     setSkip((prev) => prev - 5);
        //   }
        //   tableRef.current.onQueryChange();
        // }}
        onRowClick={(event, rowData) => {
          // console.log("Check", rowData);
        }}
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
                  {userPerpage.map((pageS) => {
                   
                    return(
                      <option
                      selected = {pageS === pageSize}
                      style={{
                        background: "#fff",
                        border: "0px",
                        outline: "0px",
                        boxShadow: "0 5px 10px -2px rgba(0,0,0,.16)",
                      }}
                      key={pageS}
                      value={pageS}
                    >
                      {pageS}
                    </option>
                    )
          })}
                </select>
                <IconButton
                  disabled={pageCount <= 1}
                  onClick={(e) => {
                    if(flag && pageSize>=0){
                      setSkip((prev) => prev - (subProps.count-(pageSize*pageCount)));
                      setFlag(false);
                    }
                    else{

                      pageSize>=0?setSkip((prev) => prev - pageSize):null;
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
                    {
                      flag?`${(pageCount*pageSize)+(subProps.count-(pageSize*pageCount))} out of ${subProps.count}`:`${pageCount*pageSize} out of ${subProps.count}`
                    }
                  </em>
                </div>
               
                <IconButton
                  disabled={flag}
                  onClick={(e) => {
                    ((pageSize*pageCount)+pageSize)<(subProps.count)?setSkip((prev) => prev + pageSize):setSkip((prev)=>{
                      setFlag(true);
                      return prev+(subProps.count-(pageSize*pageCount));
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
                      color: `${
                        flag
                          ? "gray"
                          : "black"
                      }`,
                    }}
                  />
                </IconButton>
              </div>
            );
          },
        }}

        bodyStyle={{
          background: "#F5F5F5",
        }}
        style={{
          
          zIndex: "1",
          boxShadow: "none",
          border: "1px solid #E5E5EA",
          width: "100%",
        }}
        icons={{
          SortArrow: forwardRef((props, ref) => (
            <ArrowDropDownSharp sx={{ color: "black" }} {...props} ref={ref} />
          )),
        }}
        localization={{
          pagination: {
            labelRowsSelect: "Showing results ",
            labelDisplayedRows: "{from} out of {count}",

            labelRowsPerPage: "Showing results",
            paginationPosition: "left",
          },
        }}
        title=""
        options={{
          emptyRowsWhenPaging: false,
          initialPage: 1,
          search: false,
          paging: true,
          sorting: true,
          pageSizeOptions: userPerpage,
          rowStyle: {
            fontFamily: "Open sans",
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: "normal",
          },
          headerStyle: {
            position: "sticky",
            paddingLeft: "15px",
            fontFamily: "Epilogue",
            fontWeight: "500px",
            fontSize: "14px",
            lineHeight: "28px",
          },
          searchFieldAlignment: "left",
          searchFieldStyle: {
            background: "gray",
          },
          actionsColumnIndex: -1,
        }}
        getRowId={(rowData) => rowData.row_ID}
        columns={[
          {
            title: "First Name",
            field: "firstName",
            sortMethod: (a, b) => {
              if (a === b) {
                return 0;
              }
              const aReverse = a.split("").reverse().join("");
              const bReverse = b.split("").reverse().join("");
              return aReverse > bReverse ? 1 : -1;
            },
            render: (rowData, idx) => {
              return(
                <div className="flex items-center">
                <Avatar key={idx} src={rowData.profileImage} className="mr-2" />
                <h1>{rowData.firstName}</h1>
              </div>
              )
            },
            
            cellStyle: {
              minWidth: "200px",
              paddingRight: "90px", 
              textAlign: "center",
              paddingTop: "8px",
              paddingBottom: "8px",
              
            },
            headerStyle: {
              paddingLeft: "20px",
            },
          },

          {
            title: "Last Name",
            field: "lastName",
            sortMethod: (a, b) => {
              if (a === b) {
                return 0;
              }
              const aReverse = a.split("").reverse().join("");
              const bReverse = b.split("").reverse().join("");
              return aReverse > bReverse ? 1 : -1;
            },
            cellStyle: {
              minWidth: "150px",
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          },
          { title: "Email Address", field: "email",cellStyle: {
            paddingTop: "8px",
              paddingBottom: "8px",
          } },
          {
            title: "Email Status",
            field: "status",
            render: (rowData, idx) => (
              <span
                key={idx}
                style={{
                  border: `${
                    rowData.emailVerified ? "solid #05944f" : "solid #ff2d55"
                  }`,
                  borderWidth: "2.5px",
                  borderRadius: "20px",
                  padding: "8px 8px 8px",
                  color: `${rowData.emailVerified ? "#05944f" : "#ff2d55"}`,
                  fontFamily: "Open Sans",
                  fontWeight: "regular",
                }}
              >
                {" "}
                {rowData.emailVerified ? "Verified" : "Not verified"}{" "}
              </span>
            ),
            cellStyle: {
              minWidth: "150px",
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          },
          {
            title: "Profile Status",
            field: "isProfileCompleted",
            render: (rowData, idx) => {
            
              return(
                <span
                key={idx}
                style={{
                  fontFamily: "Open Sans",
                  border: `${
                    rowData.isProfileCompleted && rowData.isMedicalCompleted
                      ? "solid #ff9500"
                      : "solid #d1d1d6"
                  }`,
                  borderWidth:'2.5px',
                  borderRadius: "20px",
                  padding: "5px 8px 5px",
                  color: `${
                    rowData.isProfileCompleted && rowData.isMedicalCompleted
                      ? "#ff9500"
                      : "#d1d1d6"
                  }`,
                  fontWeight: "regular",
                }}
              >
                {" "}
                {rowData.isProfileCompleted && rowData.isMedicalCompleted
                  ? "Complete"
                  : "In Complete"}{" "}
              </span>
              )
            },
            cellStyle: {
              minWidth: "200px",
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          },
          {
            title: "Created On",
            field: "createdAt",
            cellStyle: {
              minWidth: "200px",
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          },
          {
            title: "",
            field: "actions",
            render: (rowData, idx) => (
              <div>
                {/* <IconButton onClick={handleButton}><MoreVert/></IconButton> */}
                <Menu
                  key={idx}
                  as="div"
                  className="relative inline-block  text-left "
                >
                  <div>
                      <IconButton style ={{outline:'none'}}>
                    <Menu.Button className="inline-flex z-50 justify-center w-full rounded-md  px-4 py-2 bg-grey-100 text-sm font-medium text-gray-700  focus:outline-none">
                      <MoreVert
                        className=""
                        aria-hidden="true"
                      />
                    </Menu.Button>
                      </IconButton>
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
                    <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-md bg-white ring-1 ring-black ring-opacity-5 w-40 focus:outline-none">
                      <div className="py-1">
                        <Link
                          to={{
                            pathname: `/Users/Userdetails/${rowData._id}`,
                            state: {
                              id: rowData._id,
                              firstName: rowData.firstName,
                              profileImage: rowData.profileImage,
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
                                View Details
                              </p>
                            )}
                          </Menu.Item>
                        </Link>
                        {/* <Link to="/edituser">
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={handleClick}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Deactivate User
                              </p>
                            )}
                          </Menu.Item>
                        </Link> */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Make Profile Complete
                            </a>
                          )}
                        </Menu.Item> */}
                        {/* <form method="POST" action="#">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                style={{ color: "red" }}
                                onClick={handleClick2}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-red-500"
                                    : "text-gray-700",
                                  "block w-full text-left px-4 py-2 text-sm"
                                )}
                              >
                                Delete User
                              </button>
                            )}
                          </Menu.Item>
                        </form> */}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div>
                  <Dialog
                    BackdropProps={{
                      style: { backgroundColor: "rgba(0,0,0,0.03)" },
                    }}
                    sx={{
                      "& .MuiDialog-container .MuiPaper-root": {
                        boxShadow: "none",
                        height: "36%",
                        borderRadius: "15px",
                        paddingTop: "20px",
                      },
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      sx={{ fontFamily: "Epilogue", fontSize: "18px" }}
                      id="alert-dialog-title"
                    >
                      {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent style={{ overflow: "hidden" }}>
                      <DialogContentText
                        id="alert-dialog-description"
                        sx={{
                          fontFamily: "Open Sans",
                          fontSize: "16px",
                          fontWeight: "normal",
                        }}
                      >
                        User will not longer be able to access the account if
                        you deactivate it. Click "Yes" to deactivate or "No" to
                        cancel the action.
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
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent sx={{ overflow: "hidden" }}>
                      <DialogContentText id="alert-dialog-description">
                        All information related to the user wil be deleted. You
                        can still see the information linked to that user in
                        other section of the application. Click 'Yes' to delete
                        or 'No' to cacncel the action.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        style={{ height: "40px", width: "80px", margin: "0px" }}
                        onClick={handleClose2}
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
                        onClick={handleYes2}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            ),

            
          },
        ]}
        // className={` mx-4 px-4 py-2 text-base rounded-full text-${rowData.ProfileStatus=="incomplete"?"yellow":"gray"}-600 border border-${rowData.ProfileStatus=="incomplete"?"yellow":"gray"}-600`}

        // data={dat}

        data={(query) => handleData(query)}
      />
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
          <p style={{ fontFamily: "Open Sans", fontSize: "14px" }}>
            User is now deactivated
          </p>
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

      {showError2 ? (
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
          <p style={{ fontFamily: "Open Sans", fontSize: "14px" }}>
            User account Deleted
          </p>
          <span
            className="absolute inset-y-0 right-0 text-white flex items-center mr-4 cursor-pointer"
            onClick={() => setShowError(false)}
          >
            <img src={Vector} alt="" onClick={() => setShowError2(false)} />
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
    </div>
  );
}
