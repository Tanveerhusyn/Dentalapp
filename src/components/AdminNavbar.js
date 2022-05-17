import React,{useContext} from 'react';
import { useLocation,Link,useHistory} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {SideBarContext} from 'components/SidebarContext'
export default function AdminNavbar({ Ticon, setTicon }) {
  const location = useLocation().pathname;
  const history = useHistory();
 const [showSidebar,setShowSidebar] = useContext(SideBarContext);
  const state = useLocation().state;
  console.log("Nav",state);
 
  const sp = location.split('/');

  function capitalizeFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function MedicalFirstLetter(string) {
   
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  return (
    <div style ={{boxShadow: '0 4px 1px -3px  #e0e0d1',marginBottom:'27px',height:'68px'}} >
      <nav className={`bg-gray-100`} style ={{ height:'68px',marginLeft:`${showSidebar=="left-0"?"250px":"2px"}`}}>
        <div className="container max-w-full mx-auto flex items-center justify-start md:pr-8 md:pl-2">
          <div className={`${showSidebar=="left-0"?"hidden":"visible"} `} style ={{paddingBottom:'150px'}}>
            <Button
              
              color="black"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("left-0")}
            >
              <Icon name="menu" size="4xl" color="black" />
            </Button>

          </div>
          {/* className ="container max-w-full mx-auto flex flex-col items-left md:pr-8 pl-10 sm:hidden " */}
           
        
        <div role="presentation" style ={{marginBottom: '130px'}} className="hidden lg:flex ">

              <Breadcrumbs aria-label="breadcrumb" style ={{paddingTop:'8px'}} >
                <div className="flex flex-col">
                <div className ="flex flex-row" style ={{marginBottom:'4px'}}>
              {Ticon}
               <div style ={{marginLeft: '5px'}}></div>
               <Typography sx ={{color: 'black', fontWeight:'500px', fontSize: '18px',fontFamily:'Epilogue'}} >
                 {sp[sp.length-1] =="aitrack" ? "AI Track" :`${state?state.firstName:capitalizeFirstLetter(sp[sp.length-1])}`}
                </Typography>
               </div>
                
                <div className = "flex flex-row " >
                <Link
                  to="/"
                  style={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',paddingRight:0}}
                >
                 {"Home"}
                </Link>
              
                <div color="text.Secondary" style ={{display:'flex',marginLeft:'5px'}}>
                {
               
               sp.map((ch,idx)=>{
                 
                   if(ch!=="" && state){
                     
                    // ch=="Userdetails"?`Users/Userdetails/${state.firstName
                    console.log(sp[sp.length-1]);
                    if(ch=="Users"){
                      return(
                        ch.match(sp[sp.length-2])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{` > ${capitalizeFirstLetter(ch)}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',marginRight:'5px'}} to ={{
                          pathname:`/Users`,
                          state:{id:state.id, firstName:"Users"}
                        }}>{`>\t${capitalizeFirstLetter(ch)}`}</Link>
                      )
                    }
                    else if(ch=="aitrack"){
                      return(
                        ch.match(sp[sp.length-2])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{` > ${capitalizeFirstLetter("Ai Track")}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',marginRight:'5px'}} to ={{
                          pathname:`/aitrack`,
                          state:{id:state.id, firstName:"AI Track"}
                        }}>{`>\t${capitalizeFirstLetter("AI Track")}`}</Link>
                      )
                    }
                    else if(ch=="capturedetails"){
                      return(
                        ch.match(sp[sp.length-2])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{` > ${capitalizeFirstLetter("Capture Details")}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',marginRight:'5px'}} to ={{
                          pathname:`/aitrack/capturedetails/${state.id}`,
                          state:{id:state.id, firstName:state.firstName,role:state.role,id2:state.id2}
                        }}>{`>\t${capitalizeFirstLetter(ch)}`}</Link>
                      )
                    }
                     else if(ch=="Userdetails"){
                        return(
                          ch.match(sp[sp.length-2])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{`>\t${capitalizeFirstLetter(ch)}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',marginRight:'5px'}} to ={{
                            pathname:`/Users/Userdetails/${state.id}`,
                            state:{id:state.id, firstName:state.firstName,profileImage:state.image}
                          }}>{`>\t${capitalizeFirstLetter(ch)}`}</Link>
                        )
                      }
                      else if(ch=="Medicalhistory"){
                        return(
                          ch.match(sp[sp.length-1])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{` > ${capitalizeFirstLetter(ch)}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',marginRight:'5px'}} to ={{
                            pathname:`/Users/Userdetails/${state.id}/Medicalhistory`,
                            state:{id:state.id, firstName:state.firstName}
                          }}>{`>\t${capitalizeFirstLetter(ch)}`}</Link>
                        )
                      }
                      else if(ch=="Edituser"){
                        return(
                          ch.match(sp[sp.length-1])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{` > ${capitalizeFirstLetter(ch)}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black',marginRight:'5px'}} to ={{
                            pathname:`/Users/Userdetails/${state.firstName}/Edituser`,
                            state:{id:state.id, firstName:state.firstName,image:state.image}
                          }}>{`>\t${capitalizeFirstLetter(ch)}`}</Link>
                        )
                      }
                      
                 
                      // return(ch.match(sp[sp.length-1])?<div style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px'}} key ={idx} >{` > ${capitalizeFirstLetter(ch)}`}</div>:<Link key ={idx} style ={{fontFamily:'Epilogue',fontWeight:'normal',fontSize:'14px',color:'black'}} to ={{
                      //   pathname:`/${ch=="Userdetails"?`Users/Userdetails/${state.firstName}` :capitalizeFirstLetter(ch)}`,
                      //   state:{id:state.id, firstName:state.firstName}
                      // }}>{`>${capitalizeFirstLetter(ch)}`}</Link>);

                   }
                   
               })
             }
              
                </div>
                </div>
                </div>
              </Breadcrumbs>
              
             
          </div>
         
          </div>
        
      </nav>
    
    </div>
  );
}
