import React, { useState } from "react";
import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios'
function BookingNotes({state}) {
  const [loader, setLoader] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [notes, setNotes] = useState("");
  const [fetchData, setFetchData] = useState(false);
const [BookingNotes, setBookingNotes] = useState([]);

const [Refresh, setRefresh] = useState(false);
 
  
 const loggedUser = JSON.parse(localStorage.getItem("LoggedUserData"));

 async function handleCreateNotes(){    
  await axios
    .post("https://apis.toothfairyapp.co.uk/api/admins/create-booking-note",data,config)
    .then((res) => {
     
      setRefresh(true);
    })
    .catch((err) => {
      console.error(err);
    });
}


 const handleInputChange = (e) => {
   e.preventDefault();
    setNotes(e.target.value);
 }
 
    let tokenStr = "1234567";
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const handleLoading = () => {
      setFetchData(true);
      setLoader(false);
      setTimeout(() => {
        setLoader(true);
        setFetchData(false);
      }, 3000);
      handleCreateNotes();
    };



    var data = {
        from: {
          _id: loggedUser._id,
          firstName: loggedUser.firstName,
          lastName: loggedUser.lastName,
          profilePicUrl: loggedUser.profileImage,
          role: "admin",
        },
        to: {
          _id: state._id,
          firstName: state.firstName,
          lastName: state.lastName,
          profilePicUrl: state.profileImage,
          role: "patient",
        },
        note: notes,
        booking: "bookingId",
      };
       
      
  React.useEffect(() => {
    async function apiCall() {
      await axios
        .get(`https://apis.toothfairyapp.co.uk/api/admins/get-booking-notes/${state._id}/ `, config)
        .then((res) => {
          setBookingNotes(res.data.data);
          console.log("Hello")
        })
        .catch((err) => {
          console.error(err);
        });
    }
    apiCall();
  }, [fetchData]);

 


  
  

  
  setTimeout(() => {
    setLoadMore(false);
  }, 3000);

  return (
    <div
      style={{ background: "white", width: "100%", height: "100%",marginBottom:'50px'}}
      className="overflow-auto"
    >
      <div className="md:flex p-4" >
        <div className="pt-4  p-1 w-full">
          <div className="flex flex-row justify-between">
            <div
              style={{
                color: "black",
                fontFamily: "Epilogue",
                fontWeight: "500px",
                fontStyle: "normal",
                fontSize: "14px",
              }}
            >
              Booking Notes
            </div>
          </div>
          <Divider sx={{ width: "100%", margin: "0" }} />
          <div className="flex flex-col">
            <p
              style={{
                color: "#aeaeb2",
                fontFamily: "Epilogue",
                fontWeight: "500px",
                fontStyle: "normal",
                fontSize: "12px",
                lineHeight: "12px",
              }}
              className="p-2 py-5"
            >
              Dentist Notes
            </p>
            <div className="flex justify-between">
              <div className="w-full flex justify-center items-center">
                <textarea
                  style={{ width: "90%", outline: "none", marginRight: "10px", fontFamily: "Open Sans", fontSize: "14px", fontWeight: "400px",background: '#F2F1F7',borderRadius:' 2px'}}
                  className="p-4"
                  placeholder="Enter Dentist Notes here.."
                  onChange={handleInputChange}
                ></textarea>

                <button
                  onClick={handleLoading}
                  style={{ width: "105px", height: "42px",borderRadius:' 2px'}}
                  className="bg-black text-white"
                >
                  Add
                </button>
              </div>
            </div>

            {loader && BookingNotes.length!==0? (
              <>
                {
                  BookingNotes.map((note, idx) => (
                  <>
                    <div className="flex flex-col mt-8">
                  <p
                    className="w-40 md:w-full"
                    style={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "normal",
                      lineHeight: "19px",
                      color: "black",
                    }}
                  >
                    {note.note}
                  </p>
                  <div className="flex justify-between">
                    <a
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "12px",
                        fontWeight: "normal",
                        lineHeight: "19px",
                        color: "#0a84ff",
                      }}
                      href="#"
                      className="py-1"
                    >
                      {note.from.firstName} {note.from.lastName}
                    </a>
                    <a
                      href="#"
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        fontWeight: "normal",
                        lineHeight: "19px",
                        color: "#0a84ff",
                      }}
                    >
                      View booking
                    </a>
                  </div>
                  <div className="">
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "10px",
                        fontWeight: "normal",
                        lineHeight: "14px",
                        color: "rgba(60,60,60,67,0.6)",
                      }}
                    >
                     {note.createdAt}
                    </p>
                  </div>
                </div>
                <Divider sx={{ width: "100%", margin: "0" }} />
                  </>
                  ))
                }
               
                {
                  loadMore?(
                    <button type="button" class="bg-rose-600 ..." disabled
                   style ={{paddingTop:'20px',display:'flex',justifyContent:'center',alignItems:'center',fontFamily: "Open Sans",fontSize: "12px",fontWeight: "normal",lineHeight: "14px",color: "rgba(60,60,60,67,0.6)"}}

                >
                   <CircularProgress size ={14} sx={{ color: "black",marginRight:'8px'}} />
                  Loading more
                </button>
                  ):(
                    null
                  )
                }
              </>
            ) : (
              <div
                className="bg-white h-19/20 flex m-4 justify-center items-center"
                style={{ marginTop: "80px" }}
              >
                {
                  !loader?<CircularProgress sx={{ color: "black", marginTop: "40px"}} />:<p style ={{fontFamily: "Open Sans",fontSize: "12px",fontWeight: "normal",lineHeight: "14px",}}>No dentist notes found</p>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingNotes;
