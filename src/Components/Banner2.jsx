import React from 'react'
import './banner2.css'

export default function Banner2({text, photo}) {
  return (
    <div className='banner2Container'>
        <div className='banner2Text'>      
          <h1>{text}</h1>
        </div>
        <div className='banner2Img'>
          <img src={photo} alt="" />
        </div>
    </div>
  )
}
