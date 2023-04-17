import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GoMarkGithub } from 'react-icons/go'

function Footer() {
  return (
    <footer className='fixed bottom-0 z-50 w-screen h-22 p-3 py-4 md:p-6 md:px-16 bg-transparent'>
        <Link to={'https://github.com/panayotsky-dev/'} className='flex items-end justify-end px-4 gap-2'>
                <motion.span 
                initial={{opacity:0,x:200}}
                animate={{opacity:1,x:0}}                
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                 className='w-102 object-cover  text-xs font-semibold ' >created by : Panayot Petkov</motion.span>    
                
            </Link>
    </footer>
  )
}

export default Footer