import React from 'react'
import ProductCard from './ProductCard'
import './productBox.css'
import { useNavigate } from 'react-router-dom'

export default function ProductBox({header,filter,show}) {
  let navigate = useNavigate()
  let nav = () => {
      navigate(`/${filter}`)
  }
  return (
      <div className='productBoxContainer'>
        <div className={show ==='show'?'productTitle':'productTitle2'}>
            <h1>{header}</h1>
            <a href="" onClick={nav}>See All</a>
        </div>
        <div>
            <ProductCard category={filter}></ProductCard>
        </div>
      </div>
  )
}
