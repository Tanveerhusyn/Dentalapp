import React,{useEffect} from 'react'
import Card from 'components/Card'
import MedicalCard from 'components/MedicalCard'
import Udetails from 'components/Udetails'
import BookingNotes from 'components/BookingNotes'
import {useLocation} from "react-router-dom";
import { CircularProgress } from '@mui/material';

import axios from 'axios';

import { Link } from 'react-router-dom'
import Aitrack from './AiTrack'
function UserDetails() {
const [user,setUser]=React.useState();


const [AIData,setAIData]=React.useState(0);
const [Detect,setDetect]=React.useState(0);
const [Medical,setMedical]=React.useState(0);
const [answerID, setAnswerID] = React.useState();
const [createdAt, setCreatedAt] = React.useState();
const [Answer, setAnswer] = React.useState([]);


const state = useLocation().state;
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

  React.useEffect(() => {
    async function apiCall() {
      await axios
        .get(
          `https://apis.toothfairyapp.co.uk/api/admins/get-answer/question/${answerID}`,
          config
        )
        .then((res) => {
          // setUser(res.data.data.answers);
          setAnswer(res.data.data.data);
          setCreatedAt(res.data.data.data[0].createdAt);
          setAnswerID(res.data.data.data[0]._id);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    apiCall();
  }, []);

  useEffect(() => {
    async function apiCall() {      
      await axios 
      .get(`https://apis.toothfairyapp.co.uk/api/admins/user/${role}/${state.id}`,
        config )
        .then((res) => {
          setUser(res.data.data.user);  
          
        

          res.data.data.user.answers.map((item)=>{
            if(item._id == "ai"){
              setAIData(item.total)
            }
            if(item._id == "question"){
                setMedical(item.total*18)
            }
            if(item._id == "detect"){
              setDetect(item.total)                  
            } 
          })
        
                         
        })
        .catch((err) => {
          console.error(err);
        });
      }
        apiCall();  
      },[]);

    
    return (
       user?(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} >

        <div className='flex relative w-64 md:w-710  justify-start md:justify-start lg:justify-center overflow-auto scrollbar-hide' style ={{height:'100px',paddingLeft:'55px'}}>
            <div  style={{marginRight:'16px'}}>
                <Link to={{
                    pathname:`/Users/Userdetails/${user.firstName}/Medicalhistory`,
                    state:{id:user._id,firstName:user.firstName,Answer:Answer,answerID:answerID}
                }}> <Card   title ="Medical History" stitle ={`${ Answer.length!==0 && Answer[0].createdAt!==""?formatDate(Answer[0].createdAt):"Not added"}`}/></Link>
            </div>
            <div  style={{marginRight:'16px'}}>
            <Link to ="/aitrack">
               <Card title ="AI Track" stitle ={`${AIData}`}/>
            </Link>
            </div>
            <div  style={{marginRight:'30px'}}>
             <Link to="/detect">
              <Card title ="Detect" stitle ={`${Detect}`}/>
               </Link> 
            </div> 
           
        </div>
        <div style ={{display:'flex',flexDirection:'column'}} className='w-64 md:w-710 h-[299px]'>
            <div style={{marginBottom:'20px'}}  className='w-full md:w-full'> <MedicalCard state = {user}/></div>
            <div style={{marginBottom:'20px'}}  className='w-full md:w-full'> <Udetails state = {user} image = {state.profileImage}/></div>
            <div style={{marginBottom:'20px'}}  className='w-full md:w-full'><BookingNotes state = {user}/></div>
       
        
         
        </div>
        </div>
       ):(
           
           <div style ={{display:'flex',justifyContent:'center',alignItems:'center', marginTop:'25%'}}>
               <CircularProgress />
           </div>
       )
    )
}

export default UserDetails