
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

function CartItemsContainer({product}) {
    const [quantity,setQuantity] = useState(1)
    const [price,setPrice] = useState((product.price * quantity).toFixed(2))
    const [test,setTest] = useState(0)
   
    const [{cartShow,cartItems, user,cartPrice}, dispatch] = useStateValue();
    const [filtredProducts,setFiltredProducts] = useState('')   


   

        const minusCount = (id) => {
               if(quantity > 1){
               setQuantity(quantity - 1)
            }else if(quantity == 1){                
             let filtredProducts = cartItems.filter((item) => item.id != product.id)              
              dispatch({
                type: actionType.SET_CARTITEMS,
                cartItems: [...filtredProducts]
            })
            localStorage.setItem('cartItems',JSON.stringify([...filtredProducts,product]))
              
            }

        }
        const plusCount =(id) => {
            setQuantity(quantity +1)
            setPrice((product.price * quantity).toFixed(2))
            console.log(cartItems)    
            cartItems.map((cartItem) => {if(cartItem.id ===id){ cartItem.quantity += 1}})
            
            localStorage.setItem('cartItems',JSON.stringify([...cartItems]))
             

        }
        useEffect(() => {
          quantity == 1 ? setPrice(product.price) : setPrice((product.price * quantity).toFixed(2))
          
          
        }, [quantity])
        
       
    
  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center  gap-2'>
                        <img 
                         src={product?.imageUrl}
                         alt=''
                         className='w-20 h-20 max-w-[60px] rounded-full object-contain' 
                        />
                        <div className='flex flex-col gap-2'>
                            <p className='text-base text-gray-50 '>{product?.title}</p>
                            <p className='text-md block  text-gray-300 font-semibold'>$ {price}</p>
                        </div>

                        <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                            <motion.div whileTap={{scale:0.8}}>

                                <BiMinus className='text-gray-50'
                                 onClick={() => minusCount(product.id)}
                                 />
                            </motion.div>
                            <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
                                {quantity}
                                </p>
                            <motion.div whileTap={{scale:0.8}}>
                                <BiPlus className='text-gray-50'
                                onClick={()=> plusCount(product.id)}
                                />
                            </motion.div>
                        </div>
                        
                    </div>
  )
}

export default CartItemsContainer