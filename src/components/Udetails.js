import React,{useState, useEffect} from "react";
import {Divider,Avatar} from '@mui/material';
import { EditOutlined} from '@mui/icons-material';
import { Link } from "react-router-dom";
import {useLocation,useHistory} from "react-router-dom";




function Udetails({state,image}) { 
  const {user} = useLocation().state;
    const [Dob , setDob] = useState('')

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


  

   var FullDate = ""
  
  React.useEffect(()=>{
  // FullDate  = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDay()}`
  setDob(formatDate(state.dob))
  },[])
   
  return (
    <div style={{background:'white', width:'100%', height:'100%'}} >
      <div className="md:flex ">
        <div className="w-full">
        <div className="flex flex-row justify-between items-center  p-3">
            <div className ="" style ={{color:'black',fontFamily:'Epilogue',fontWeight:'500px',fontStyle:'normal',fontSize:'14px'}}>User</div>
            <Link to ={
              {
                pathname:`/Users/Userdetails/${state.firstName}/Edituser`,
                state:{id:state._id, firstName:state.firstName,user:state,image:image}
              }
            }> 
           
             <div style ={{display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Epilogue',fontWeight:'500px',fontStyle:'normal',fontSize:'14px'}}>
             <EditOutlined style ={{color: '#0a84ff', width:'23px',marginRight:'3px'}}/>
                <p style ={{color:'#0a84ff'}}>Edit Details</p>
             </div>
            </Link>
          </div>
          <Divider sx={{width:'100%', margin:'0', padding:0}}/>
          <div className ="p-3 pb-0">
          <div className="flex flex-col justify-center">
            <p style={{color:'#aeaeb2',fontSize:'12px',fontFamily:'Epilogue'}} className ="p-2">Personal Details</p>
            <div className="flex justify-between">
              <Avatar style ={{width:'128px',height:'128px', margin:'10px',marginLeft:0}}src ={image}/>
              <p style={{color:'#aeaeb2',fontSize:'14px',fontFamily:'Open Sans',fontWeight:'normal'}} className ="p-2 mt-10">Profile Image</p>
            </div>
          </div>
          <Divider sx={{width:'100%', margin:'0'}}/>
          <div className="flex flex-row justify-between">
            <p style={{color:'black',fontSize:'14px',fontFamily:'Open Sans',fontWeight:'400px'}}  className ="p-2">{state.firstName} {state.lastName}</p>
            <div className="flex p-2" >
            <p style={{color:'#aeaeb2',fontSize:'14px',fontFamily:'Open Sans'}} className ="p-2">Full Name</p>

            </div>
          </div>
          <Divider sx={{width:'100%', margin:'0'}}/>
          <div className="flex flex-row justify-between">
            <p style={{color:'black',fontSize:'14px',fontFamily:'Open Sans',fontWeight:'400px'}} className ="p-2">{state.dob!==0?formatDate(state.dob):"-"}</p>
            <div className="flex p-2" >
            <p style={{color:'#aeaeb2',fontSize:'14px',fontFamily:'Open Sans'}}  className ="p-2">Date of Birth</p>

            </div>
          </div>
          <Divider sx={{width:'100%', margin:'0'}}/>
          <div className="flex flex-row justify-between">
            <p style={{color:'black',fontSize:'14px',fontFamily:'Open Sans',fontWeight:'400px'}} className ="p-2">{state.gender?state.gender:"-"}</p>
            <div className="flex p-2" >
            <p style={{color:'#aeaeb2',fontSize:'14px',fontFamily:'Open Sans'}}  className ="p-2">Gender</p>

            </div>
          </div>
          <Divider sx={{width:'100%', margin:'0'}}/>
          <div className="flex flex-row justify-between">
            <p style={{color:'black',fontSize:'14px',fontFamily:'Open Sans',fontWeight:'400px'}} className ="p-2">{state.address.formattedAddress==""?"-":state.address.formattedAddress} </p>
            <div className="flex p-2" >
            <p style={{color:'#aeaeb2',fontSize:'14px',fontFamily:'Open Sans'}}  className ="p-2">Address</p>

            </div>
          </div>
          <Divider sx={{width:'100%', margin:'0'}}/>
          <div className="flex flex-row justify-between pb-0 ">
            <p style={{color:'black',fontSize:'14px',fontFamily:'Open Sans',fontWeight:'400px'}} className ="p-2 pb-0">{state.email?state.email:"-"} <span style={{color: `${state.emailVerified ? "green" : "red"}`}}>{state.emailVerified?"(verified)":"(not verfied)"}</span> </p>
            <div className="flex p-2 pb-0" >
            <p style={{color:'#aeaeb2',fontSize:'14px',fontFamily:'Open Sans'}}  className ="p-2 ">Email</p>

            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Udetails;