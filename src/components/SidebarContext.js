import React,{createContext, useState} from 'react'

export const SideBarContext = createContext();
export const SidebarContextProvider = (props)=> {

    const [showSidebar, setShowSidebar] = useState("left-0");
    return (
        <SideBarContext.Provider value={[showSidebar,setShowSidebar]}>
            {props.children}
        </SideBarContext.Provider>
    )
}


