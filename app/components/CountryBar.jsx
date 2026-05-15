import React from 'react';

export default function CountryBar({ countries }) {
  return (
    <div className='topBar'>
      {
        countries.map((country) => {
          return (
            <span key={country.isoCode}>{country.name}</span>
          )
        })
      }
      <span>
        <img
          style={{ width:20, height:20}}
          src="https://cdn.shopify.com/s/files/1/0993/9714/0770/files/WhatsAppImage2026-04-21at3.47.58PM.jpg?v=1776811356"
        />
      </span>  
    </div>
  )
}