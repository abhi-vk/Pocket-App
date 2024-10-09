import banner from "../assets/Banner.png";
import React from 'react'
import NotesFooter from './NotesFooter'

const MainPage = () => {
  return (
    <div className="bg-banner-blue w-screen h-screen">
     <img src={banner} alt='banner' className=" pl-72 pt-28"/>
     <h2 className="text-black font-roboto font-bold text-4xl leading-normal tracking-wide pl-[32vw] notes-style">Pocket Notes</h2>
     <p className="text-text-color font-roboto font-semibold text-xl custom-style pl-[20vw]">
        Send and receive messages without keeping your phone online.
        <br /> Use Pocket Notes on up to 4 linked devices and 1
        mobile phone
     </p>
     <NotesFooter/>
    </div>
  )
}

export default MainPage
