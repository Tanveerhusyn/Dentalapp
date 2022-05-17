/** @format */

import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {CircularProgress} from "@mui/material";

function MedicalDetails() {
  const [user, setUser] = React.useState([]);
  // const [answerID, setAnswerID] = React.useState();
  // const [createdAt, setCreatedAt] = React.useState();
  // const [Answer, setAnswer] = React.useState([]);
  const [loader, setLoader] = React.useState(true);

  const {Answer, answerID} = useLocation().state;

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // React.useEffect(() => {
  //   async function apiCall() {
  //     await axios
  //       .get(
  //         `http://18.133.73.98:5000/api/admins/patient-answers/question/${state.id}/{search}/0/{limit}`,
  //         config
  //       )
  //       .then((res) => {
  //         // setUser(res.data.data.answers);
  //         console.log("Medical", res.data.data.data);
  //         setAnswer(res.data.data.data);
  //         setCreatedAt(res.data.data.data[0].createdAt);
  //         setAnswerID(res.data.data.data[0]._id);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }

  //   apiCall();
  // }, []);

  React.useEffect(() => {
    async function apiCall1() {
      await axios
        .get(
          `http://18.133.73.98:5000/api/admins/get-answer/question/${answerID}`,
          config
        )
        .then((res) => {
          setUser(res.data.data.answers);
          console.log("Answer", res.data.data.answers);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    apiCall1();
  }, [answerID]);

  setTimeout(() => {
    setLoader(false);
  }, 3000);


  console.log("Answer", Answer);
  return (
    <div className="p-2  flex mx-auto w-64 md:w-710 justify-center">
      {
        user.length!==0?<div className=" mx-auto w-full md:w-710  ">
        <div className="bg-white rounded   w-full h-full  p-4 ">
          <div className=" flex flex-row justify-between divide border-b p-2 mb-3">
            <div className="mt-3">
              <p
                style={{
                  color: "black",
                  fontFamily: "Epilogue",
                  fontWeight: "500px",
                  fontStyle: "normal",
                  fontSize: "14px",
                }}
              >
                Medical History
              </p>
            </div>

            <div className=" pl-5 relative">
              <svg
                style={{
                  color: "#323232",
                  height: "10px",
                  width: "10px",
                  marginRight: "10px",
                  marginTop: "17px",
                }}
                className="w-3 h-3 absolute    right-3 text-black pointer-events-none "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 412 232"
              >
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="black"
                />
              </svg>
              <select
                onChange={(e) => {
                  Answer.map((item) => {
                    if (item.createdAt == e.target.value) {
                      setAnswerID(item._id);
                    }
                  });
                }}
                style={{
                  color: "#8e8e93",
                  outline: "none",
                  border: "none",
                  borderRadius: "2px",
                  width: "132px",
                  height: "42px",
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                }}
                className="border border-gray-300  mr-2  rounded-sm px-4 bg-gray-100 px-9  text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
              >
                {Answer.map((item, index) => {
                  var myDate = new Date(item.createdAt);
                  let FullDate = `${myDate.getDay()}/${
                    myDate.getMonth() + 1
                  }/${myDate.getFullYear()} ${myDate.getHours()}:${myDate.getMinutes()}`;
                  console.log(FullDate);
                  return index == 0 ? (
                    <option value={item.createdAt}>Latest</option>
                  ) : (
                    <option value={item.createdAt}>{FullDate}</option>
                  );
                })}
              </select>
            </div>
          </div>

          {user &&
            user.map((ques, idx) => (
              
                idx==user.length - 1 ? (
                  <div key={idx} className="p-3">
                <p
                  className="text-gray-400"
                  style={{
                    color: "rgba(60,60,67,0.6)",
                    fontFamily: "Open Sans",
                    fontWeight: "normal",
                  }}
                >
                  {ques.question}
                </p>
                <div className="flex flex-row justify-between mb-1 mt-2">
                  <p
                    style={{
                      color: "black",
                      fontFamily: "Open Sans",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                  >
                    {ques.answer}
                  </p>
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                    className="text-gray-400"
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
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                  >
                    {ques.description}
                  </p>
                  {
                    ques.answer=="No" ? null:<p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                    className="text-gray-400"
                  >
                    Note
                  </p>
                  }
                </div>
              </div>
                ):(
                  <div key={idx} className=" p-3 border-b">
                <p
                  className="text-gray-400"
                  style={{
                    color: "rgba(60,60,67,0.6)",
                    fontFamily: "Open Sans",
                    fontWeight: "normal",
                  }}
                >
                  {ques.question}
                </p>
                <div className="flex flex-row justify-between mb-1 mt-2">
                  <p
                    style={{
                      color: "black",
                      fontFamily: "Open Sans",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                  >
                    {ques.answer}
                  </p>
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                    className="text-gray-400"
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
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                  >
                    {ques.description}
                  </p>
                  {
                    ques.answer=="No" ? null:<p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "19px",
                    }}
                    className="text-gray-400"
                  >
                    Note
                  </p>
                  }
                </div>
              </div>
                )
              
            ))}
        </div>
      </div>:<div className="flex justify-center items-center" style ={{marginTop:'190px',fontFamily:"Epilogue",fontSize:'16px'}}><CircularProgress style ={{display:`${!loader?"none":"block"}`}} />{!loader?"No Data present":""}</div>
      }
    </div>
  );
}

export default MedicalDetails;
