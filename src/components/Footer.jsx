import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GoMarkGithub } from 'react-icons/go'

function Footer() {
  return (
    <footer className='flex  justify-center items-center bottom-0 z-50  h-22 p-2 py-2  mt-6 bg-transparent'>
        <Link to={'https://github.com/panayotsky-dev/'} className='flex  px-4 gap-2'>
                <motion.span 
                initial={{opacity:0,y:2000}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:2000}}                
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                 className='w-102 object-cover  text-xs font-semibold ' >created by : Panayot Petkov</motion.span>    
                
            </Link>
    </footer>
  )
}

export default Footer