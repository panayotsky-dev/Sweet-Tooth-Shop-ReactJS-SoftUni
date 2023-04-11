import React, { useEffect, useState } from 'react'
import {MdOutlineKeyboardBackspace,} from 'react-icons/md'
import {RiRefreshFill, } from 'react-icons/ri'
import {BiMinus,BiPlus} from 'react-icons/bi'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import CartItemsContainer from './CartItemsContainer'
import { discountCodes } from '../utils/data'
import { Link } from 'react-router-dom'



function CartContainer() {

    const [discount, setDiscount] = useState('');
    const [sum,setSum] = useState(0);

    const [rotate,setRotate] = useState(false);

    const [{cartShow,cartItems, user,cartPrice}, dispatch] = useStateValue();

      
    
    // useEffect(() => {
    //   if(discount > 3 ){
    //     let asd =  discountCodes.filter(discountCode => discountCode.code == discount)
    //     asd ? console.log(asd) : console.log('Nope')
    //   }
      
    // }, [discount.length > 2])
    

    
    
    const showCart = () =>{
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }
    
    const checkDiscountCode =  (value) => {
        setDiscount(value)
            if(discount.length > 2){
                let asd =  discountCodes.filter(discountCode => discountCode.code.toLowerCase() == value)
                 if(asd.length >= 1){
                    setDiscount(Number(asd[0].discountPercent)) 
                 }
               
                 
        }       
      
       
    
    }

    const totalSum = () => {
        discount < 100 ? cartItems.forEach(element => {
            setSum(sum + ((element.price * element.quantity) * (discount/100)))
        })
        : setSum('Congratualations it is free')

    }
    const removeItems = () => {
        setRotate(!rotate)
        setTimeout(() => {
            dispatch({
                type: actionType.SET_CARTITEMS,
                cartItems: [],
            })
            }, 800);

        }
        const remove = () => {
            dispatch({
                type: actionType.SET_CARTITEMS,
                cartItems: [],
            })
        }
     
        
        
        

  return (
    
    <motion.div
    initial={{opacity:0, x:200}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x:200}}
     className='fixed top-32 right-0 w-full md:w-350 h-[100vh] bg-white rounded-md
     drop-shadow-md flex flex-col z-101'>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div 
            whileTap={{scale:0.8,x:-10,opacity:0}}
             whileHover={{scale:1.1}}
             onClick={showCart}>
            <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>
                Cart
            </p>
            <motion.p 
            whileTap={{scale:0.8}} 
            onClick={() => removeItems()}
            className='flex items-center gap-2 p1 px-2 my-2 bg-gray-100 rounded-md
            hover:shadow-md cursor-pointer text-textColor'>
                Clear <motion.div 
                        
                        animate={{rotate: rotate ? 360: 0}}                    
                        transition={{duration: 1}}                    
                        



                        >
                            
                            <RiRefreshFill />
                      </motion.div>
            </motion.p>            
        </div>
   
        <div className='w-full h-full bg-gray-600 rounded-t-[2rem] flex flex-col'>
            <div>
                <div className='w-full h-[400px] md:h-42 px-6 py-2 flex flex-col gap-3
                 overflow-y-scroll scrollbar-[#f9b8b9] scrollbar-track-[#93d4d7]'>
                    {/* Cart Item */}
                    {cartItems && cartItems.map((product) => (
                        <CartItemsContainer key={product.id} product={product}/>
                    ))}
                </div>
            </div>
            {/* Cart Footer */}
        {cartItems && cartItems.length > 0 
        ? (
            <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col 
                items-center justify-evenly mt-6 pb-32 px-8 py-4'>
                    <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Discount:</p>
                    <input 
                    type="text"
                        id="discountCode"
                        className='w-4/6 h-10 rounded-md bg-gray-100 text-gray-600 -ml-2'
                        onChange={(e) => checkDiscountCode(e.target.value)}
                        
                        />
                    </div>
                    
                    <div className='w-full border-b border-gray-600 my-6'></div>

                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-200 text-xl font-semibold'>
                            Total
                        </p>
                        <p className='text-gray-200 text-xl font-semibold'>
                            $ {setSum}
                        </p>                   
                    </div>
                    <Link to={'/checkout'}>
                    <motion.button
                    whileTap={{scale:0.8}}
                    type="button"
                    className='w-full p-2 rounded-full bg-slate-500 text-gray-50 text-lg mb-8 mt-4
                    hover:shadow-lg '
                    onClick={() => remove()}
                    >Check out
                    </motion.button>
                    </Link>
                </div>) 
            : (
            <div className='w-full h-full flex flex-col items-center justify-center -mt-12 gap-6'>
                <img src='https://shop.millenniumbooksource.com/static/images/cart1.png' className='min-w-620' alt='Empty cart'/>
                    {/* <p className="text-xl text-[#f9b8b9] font-semibold ">
                        Add items to your cart
                    </p> */}
            </div>)}
            
        </div>
    </motion.div>
  )
}

export default CartContainer








