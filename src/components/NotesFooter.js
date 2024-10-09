import React from 'react'
import lock from '../assets/lock.png'

const NotesFooter = () => {
  return (
    <footer>
      <div className='flex pl-[34vw] pt-[20vh]'>
      <img src={lock} alt="lock" className='w-6 h-6 pr-2'></img>
      <p className='font-roboto text-text-color font-medium text-sm custom-style'> end-to-end encrypted</p>       
      </div>
    </footer>
  )
}

export default NotesFooter
