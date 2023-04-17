import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import {motion} from 'framer-motion'
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import CartContainer from './CartContainer'
import { Typewriter } from 'react-simple-typewriter'    

function ItemPage({product}) {
    const [{user,cartItems,uploadedProducts,cartShow},dispatch] = useStateValue()
   let location = useLocation()
   let pattern = '/Products/'
   const _id = location.pathname.slice(pattern.length)
   const [selectedProduct,setSelectedProduct] = useState('')
   
   const addToCart = (product) => {
    if(user){
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: [...cartItems,product]
        })
        localStorage.setItem('cartItems',JSON.stringify([...cartItems,product]))
    }

}
  
   
  
    

   
    
  return (    
    <div className='h-screen' >
        
    <section className='w-full h-auto relative flex-col items-center justify-center 
    bg-opacity-20 rounded-md py-12 px-12   bg-slate-600'>
    {uploadedProducts && uploadedProducts.map((product)=>(
        product.id == _id && (
            <div key={product.id}>               
                
                <div className='w-full h-auto bg-slate-600 bg-opacity-20 my-2  bg- rounded-lg p-2 shadow-md  flex flex-col items-center justify-between'>
                <p className=' font-semibold justify-center my-4 flex items-center text-3xl'>
                {product.title}
                    </p> 
                   
                <div className='w-full flex items-center justify-between' >
                    <div >
                    <motion.img  
                    whileTap={{scale:0.9}}
                    onClick={()=>addToCart(product)}
                    whileHover={{scale:1.2}}
                    src={product?.imageUrl} 
                    alt=''
                    className='flex justify-start items-start w-[540px] h-[540px] rounded-lg translate-x-0   ' /> 
                    </div>
                       <div>
                        <p className='rounded-xl h-16 flex justify-center items-center mx-4 p-2  bg-slate-600 bg-opacity-20'>{product.description}</p>
                        </div>       
                    <motion.div 
                    onClick={()=>addToCart(product)}
                    whileTap={{scale:0.7}}
                    whileHover={{scale:1.1}} className='w-24 h-24 rounded-full bg-[#FFC5FF] hover:bg-[#f9b8b9]
                    flex items-center justify-center cursor-pointer hover:shadow-md -mr-12 '
                    >
                    <MdShoppingCart className='text-white w-16 h-16'/>
                    </motion.div>
                </div >
                <div className='w-full flex flex-col gap-2 mt-2 items-start justify-center'>
                               
                    <div className='flex flex-col items-center justify-center gap-2 '>
                        <p className='text-lg text-textColor font-semibold'>
                            <span className='text-md  font-semibold'>$</span>
                            {product?.price}
                            </p>
                    </div>
                </div>
            </div>
            {cartShow&&(
          <CartContainer />
        )} 
                
            </div>
    )))}
    </section>
    </div >
  )
}


export default ItemPage