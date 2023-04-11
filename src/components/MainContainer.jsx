import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer'
import {motion} from 'framer-motion'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

import CartContainer from './CartContainer'
import { Link } from 'react-router-dom'
function MainContainer() {

  const [{uploadedProducts,cartShow},dispatch] = useStateValue() 

  return (   

    <div className='w-full h-screen flex flex-col items-center justify-center '>
      <motion.img
      initial={{opacity:0,y:-600}}
      animate={{opacity:1,y:-100}}
      exit={{opacity:1,y:0}}
      
      transition={{type:"spring", stiffness:100}}
      whileHover={{scale:1.2}}
        src='/sweetth.png'
        alt='sweeth logo'
       />
         <Link to={'/Products'}>      
        <motion.button
                    whileTap={{scale:0.8}}
                    whileHover={{scale:1.2}}
                    transition={{type:"spring", stiffness:100}}
                    type="button"
                    
                    className='w-40% p-2 rounded-full bg-[#FEEBD6] text-slate-600 text-lg font-bold mb-8 mt-4
                    hover:shadow-lg '
                    >Enter to the shop
        </motion.button>
        </Link>
        
    </div>
  )
}

export default MainContainer