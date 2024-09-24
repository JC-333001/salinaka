import React from 'react'
import './button.css'

export default function Button({onClick, text}) {
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}
