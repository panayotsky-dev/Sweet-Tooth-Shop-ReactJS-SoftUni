import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import CartContainer from './CartContainer'

function AboutUsPage() {

  const [{uploadedProducts,cartShow},dispatch] = useStateValue()
  

  
  

  return (
    <div className='w-full h-screen'>
    <main className='px-64 w-full flex justify-center items-center h-auto '>
      
      <p className=' justify-center items-center text-center flex font-semibold my-64'>
      Sweet Tooth is an e-shop with unique design that provides an easy and intuitive way to buy coffee and sweet products online. The website is built using ReactJS, Redux, useState, useEffect, useStateValue, Framer-Motion, TailwindCSS, and Firebase, and has an attractive and unique UI design with a modern look and feel. The website is responsive and provides a seamless shopping experience to the users. The integration of Firebase provides a real-time database, storage, and authentication services which are used to manage the user data.
      </p>
      
    </main>
    {cartShow&&(
          <CartContainer />
        )}
    </div>
  )
}

export default AboutUsPage
