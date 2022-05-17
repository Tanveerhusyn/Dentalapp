import React from 'react'
import { MdLogout } from "react-icons/md";

function logout({isLogged,setisLogged}) {
    return (
        <div onClick={setisLogged(false)}>
            <div className="pl-3 text-red-600 cursor-pointer ml-3 flex flew-row ">
              <MdLogout className=" mt-1" />
              <p className="ml-2 mb-1">Log out</p>
            </div>
        </div>
    )
}

export default logout
