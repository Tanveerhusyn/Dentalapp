import React from 'react'
import CloudOffIcon from '@mui/icons-material/CloudOff';
import {ReactComponent as ReactLogo} from '../assets/Cloud.svg';
function Dashboard() {

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100 flex-col' style ={{overflowY:'hidden',paddingBottom:'150px'}}>
            <ReactLogo />
            <h1 style={{fontFamily:'Epilogue',fontWeight:'bold', fontSize:'28px',lineHeight:'36px'}}>Under Development</h1>
            <p style={{fontFamily:'Open Sans',fontSize:'16px',lineHeight:'24px',textAlign:'center'}}>This page is under development. You will be notified<br/>once it is available and ready to use.
            </p>
        </div>
    )
}

export default Dashboard;
