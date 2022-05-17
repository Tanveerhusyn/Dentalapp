import { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
// import Icon from "@material-tailwind/react/Icon";
// import H6 from "@material-tailwind/react/Heading6";
// import GroupIcon from "@mui/icons-material/Group";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
// import BurstModeIcon from "@mui/icons-material/BurstMode";
import { BiImages } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import logout from "./logout";
import { DashboardOutlined, PeopleOutlineSharp } from "@mui/icons-material";
import {SideBarContext} from 'components/SidebarContext';
export default function Sidebar({ isLogged, setisLogged,setloginToken }) {
  
  const [Ticon, setTicon] = useState(<DashboardOutlined />);
  const [showSidebar,setShowSidebar] = useContext(SideBarContext);
  let webApiUrl = "http://18.133.73.98:5000/api/auth/logout";
  let tokenStr = "1234567";

  var data = {
    role: "patient",
    email: "raviroshanmehta@gmail.com",
    password: "123456",
    device: {
      id: "a577f69031845c8cb",
      token:localStorage.getItem("token")    },
  }

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  }
}
 
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
        await axios
        .get(webApiUrl,config)
        .then((res) => {
         
          setisLogged(false);
          localStorage.removeItem("token");
          setloginToken(null);
          
        }).catch((err) =>{
          console.error(err)
        })
        
        
       }
  
console.log("NavMAR",showSidebar)
  return (
    <div>
      <AdminNavbar
        Ticon={Ticon}
        setTicon={setTicon}
      />
      <div
        className={`h-screen fixed top-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden bg-white w-64 z-50 py-4 transition-all duration-300`}
        style ={{width:'243px'}}
      >
        <div   className="flex-col items-stretch min-h-full flex-nowrap relative flex justify-between">
          <div >
            <div
              className="flex flex-row relative justify-center items-center "
              style={{ margin: "12px 10px"}} >

              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-center w-full inline-block"
              >
                <h1
                  className="text-gray-600 mb-3 "
                  style={{ marginRight: "60px",fontFamily:"Epilogue",fontWeight:'500',fontSize:'14px',lineHeight:'14.35px',color:'#8e8e93' }}
                >
                  Toothfairy Admin
                </h1>
              </a>
              <div
                style={{ transform: "rotate(-90deg)", marginLeft: "40px" }}
                className="absolute right-0 "
              >
                <ExpandLessIcon onClick ={()=>setShowSidebar("-left-64")} className="transform rotate-45 text-xs mt-2  ml-3 cursor-pointer   text-gray-400 font-extralight	" />
              </div>
            </div>

            <hr className="my-4 min-w-full" />
            <div className="flex flex-col px-4 ">
              <ul className="flex-col min-w-full flex list-none" style ={{fontFamily:"Epilogue" }}>
                <li className="rounded-lg mb-2">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setTicon(<DashboardOutlined />)}
                    exact
                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="bg-black text-white shadow-md"
                  >
                    <DashboardOutlined />
                    Dashboard
                  </NavLink>
                </li>
                <li className="rounded-lg mb-2">
                  <NavLink
                    to="/users"
                    onClick={() => setTicon(<PeopleOutlineSharp />)}
                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="bg-black text-white shadow-md"
                  >
                    {/* <Icon name="toc" size="2xl" /> */}
                    <PeopleOutlineSharp />
                    Users
                  </NavLink>
                </li>
                <li className="rounded-lg mb-2">
                  <NavLink
                    to="/detect"
                    onClick={() => setTicon(<ImageSearchIcon />)}
                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                    activeClassName="bg-black text-white shadow-md"
                  >
                    <ImageSearchIcon />
                    Detect
                  </NavLink>
                </li>
                <li className="rounded-lg mb-2 ">
                  <NavLink
                    to="/aitrack"
                    onClick={() => setTicon(<BiImages className="text-2xl" />)}
                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="bg-black text-white shadow-md"
                  >
                    <BiImages className="text-2xl" />
                    AI Track
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <a href="/" className="mt-2  text-center w-full inline-block" style ={{marginLeft:'30px'}}>
              <div className="pl-3 text-red-600 cursor-pointer ml-3 flex flew-row ">
                <MdLogout className=" mt-1" />
                <p onClick = {handleSubmit} className="ml-2 mb-1" style={{fontFamily:"Epilogue" }}>Log out</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

 
}