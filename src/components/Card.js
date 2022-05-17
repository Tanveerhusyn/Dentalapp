import React from "react";

function Card({title, stitle}) {
  return (
    <div className="bg-white" style ={{border: '1px solid #E5E5EA'}}>
      <div className="items-stretch lg:flex h-20" style ={{width:'232px'}}>
        <div className="md:w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="">
            <div className="text-black  text-xl" style ={{fontFamily:'Epilogue',fontWeight:'500px',fontSize:'14px',marginBottom:"2px"}}>
              {title}
            </div>
            <p className="text-base" style ={{color:'rgba(60,60,67,0.6)',fontFamily:'Epilogue',fontWeight:'500px',fontSize:'12px'}}>{stitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
