import React, {  useEffect, useLayoutEffect, useRef, useState } from 'react'
import {MdShoppingCart} from 'react-icons/md'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { Link } from 'react-router-dom'

function RowContainer({flag,products}) {  
    console.log(products)
  const [{user,cartItems,uploadedProducts},dispatch] = useStateValue()
  const [selected,setSelected] = useState(0)
  const addToCart = (product) => {
        if(user){
            dispatch({
                type: actionType.SET_CARTITEMS,
                cartItems: [...cartItems,product]
            })
            localStorage.setItem('cartItems',JSON.stringify([...cartItems,product]))
        }
    
  }
// let donuts
// let coffee
// let cheesecake
// products != null ? 
// (donuts = products.filter((product)=>product.category === 'donuts'),
// coffee = products.filter((product)=>product.category === 'coffee'),
// cheesecake = products.filter((product)=>product.category === 'cheesecake'))
// : ""
// !donuts || !coffee || !cheesecake ? "" : console.log(donuts,coffee,cheesecake)
  return (
    
    <div 
    
    className={`w-full my-10 h-full flex gap-12 items-center flex-wrap ${// dynamic className/string
        flag ? "overflow-x-scroll scrollbar-none"
        : "overflow-x-hidden flex-wrap "}`}
    >
       {products &&
        products.map((product)=>(
            <div 
            key={product?.id} 
            className='w-225 h-auto min-w-[170px] bg-[#FEEBD6] md:min-w-[225px] md:w-225 my-2  bg- rounded-lg p-2 shadow-md backdrop-blur-lg
            bg-gradient-to-tr hover:from-[#93d4d7] hover:t-[#f9b8b9] flex flex-col items-center justify-between'>
                <div className='w-full flex items-center justify-between' >
                    <Link to={`/Products/${product.id}`} products={product}>
                    <motion.img  
                    whileTap={{scale:0.9}}
                    whileHover={{scale:1.2}}
                    src={product?.imageUrl} 
                    alt=''
                    className='w-40 h-40 rounded-lg translate-x-0 bg-[#CDCDCD] hover:bg-transparent bg-repeat:none' /> 
                    </Link>
                              
                    <motion.div 
                    onClick={()=>addToCart(product)}
                    whileTap={{scale:0.7}}
                    whileHover={{scale:1.1}} className='w-10 h-10 rounded-full bg-[#8bd8dc] hover:bg-[#f9b8b9]
                    flex items-center justify-center cursor-pointer hover:shadow-md -mr-7 mt-16'
                    >
                    <MdShoppingCart className='text-white w-6 h-6'/>
                    </motion.div>
                </div >
                <div className='w-full flex flex-col gap-2 mt-2 items-start justify-center'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                    {product?.title}
                    </p>            
                    <div className='flex items-center gap-2 -mt-2'>
                        <p className='text-lg text-textColor font-semibold'>
                            <span className='text-md font-semibold'>$</span>
                            {product?.price}
                            </p>
                    </div>
                </div>
            </div> 
        ))}
    </div> 
  )
}

export default RowContainer