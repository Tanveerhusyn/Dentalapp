import React,{useState} from "react";
import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'
import Vector from 'assets/Vector.svg'

import {Divider} from '@mui/material';
function MedicalCard({state}) {
  const [checked, setChecked] = useState(true)
  const [checked2, setChecked2] = useState(true)
  const [showError, setShowError] = useState(false)

  React.useEffect(() => {
    if(!checked2){
      setShowError(true)
      setTimeout(()=>{
        setShowError(false)
      },3000)
    }
  },[checked2])
  return (
    <div style={{background:'white', width:'100%', height:'100%',border:'1px solid #E5E5EA'}}>
      <div className="md:flex  px-0">
        <div className="w-full px-0">
          <div className=" p-3 text-md px-5" style ={{color:'black',fontFamily:'Epilogue',fontWeight:'500px',fontStyle:'normal',fontSize:'14px'}}>
            Account
          </div>
          <Divider sx={{width:'100%', margin:'0'}}/>
          <div className="flex flex-col" style ={{fontFamily:'Open Sans', fontSize:'14px',lineHeight:'19px',fontWeight:'normal',padding:'12px'}}>
            <p style={{color:'#aeaeb2',fontSize:'12px',fontFamily:'Epilogue'}} className ="p-2">Account Details</p>
            <div className="flex justify-between overflow-x-scroll md:overflow-x-hidden"  >
              <p className ="p-2" style = {{color:'black'}}>{state._id}</p>
              <p style={{color:'#aeaeb2',fontSize:'14px',fontWeight:'normal'}} className ="p-2">Account Reference ID</p>
            </div>
            <Divider sx={{width:'100%', margin:'0'}}/>
          </div>
          
          <div className="flex flex-col justify-center" style ={{fontFamily:'Open Sans', fontSize:'14px',lineHeight:'19px',fontWeight:'normal',padding:'12px'}}>
            <div className ="flex flex-row justify-between mb-2">
            <p className ="p-2" style = {{color:'black'}}>Account Status</p>
            <div className="flex p-2 " >
              <p style={{marginRight:'30px',color:'#00cc44'}}>Active</p>
            <DragSwitch className="w-10" checked={checked} onColor="black" onChange={(e) => {
             setChecked(e)}}/>
            </div>
            </div>
            <Divider sx={{width:'100%', margin:'0'}} />
          </div>
          
          <div className="flex flex-col justify-center"style ={{fontFamily:'Open Sans', fontSize:'14px',lineHeight:'19px',fontWeight:'normal',padding:'12px'}}>
            <div className="flex flex-row justify-between mb-2">
            <p className ="p-2">Profile Status</p>
            <div className="flex p-2 " >
              <p style={{marginRight:'30px',color:'#00cc44'}}>Complete</p>
            <DragSwitch checked={checked2} onColor="black" onChange={(e) => {
             setChecked2(e)}}/>
            </div>
            </div>
            <Divider sx={{width:'100%', marginBottom:'10px'}}/>
          </div>
        
          <div style ={{fontFamily:'Open Sans', fontSize:'14px',lineHeight:'19px',fontWeight:'normal', marginLeft:'10px',padding:'12px'}} href ="" className = " text-red-600">Delete User</div>
        </div>
      </div>
      {showError ? (
       
       <div
         className="fixed top-0 left-0 z-50 py-3  pl-2 leading-normal   rounded-lg text-black"
         role="alert"
         style={{
          marginTop: "38%",
          marginLeft: "10px",
          color: "#fff",
          width: "245px",
          background: "#05944f",
         }}
       >
         <p style ={{fontFamily:'Open Sans',fontSize:'14px'}}>Profile status changed to<br/>
           incomplete
         </p>
         <span className="absolute inset-y-0 right-0 text-white flex items-center mr-4 cursor-pointer" onClick={() => setShowError(false)}>
           <img  src={Vector}  alt='' onClick={()=>setShowError(false)}  />
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

export default MedicalCard;
