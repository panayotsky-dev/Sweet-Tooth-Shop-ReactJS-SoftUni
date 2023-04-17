import React, { useState } from 'react'

import { MdOutlineShoppingBag,MdAdd,MdLogout } from "react-icons/md";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.config'
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

function Header() {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{user,cartShow,cartItems}, dispatch] = useStateValue();
    const [isMenu,setIsMenu] = useState(false)
    const login = async () => {    
        
        
        if(!user){
            
            const {user :{refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
        dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
        })
        localStorage.setItem("user",JSON.stringify(providerData[0]))
        
        }else{
            setIsMenu(!isMenu);
            
        }
    }
const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
        type: actionType.SET_USER,
        user: null,
    })
}

const showCart = () =>{
    if(user){   
        dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
    })
    }
     
}
  return (
    
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-transparent'>
        {/* desktop/tablet */ }
        
        <div className='hidden md:flex w-full item-center justify-between '>
            <Link to={'/'} className='flex items-center gap-2'>
                <motion.img 
                initial={{opacity:0,x:-200}}
                animate={{opacity:1,x:0}}                
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                src='/logoLarge.png' alt='logo' className='w-32 object-cover' />
                
                
            </Link>
            
            
            <div className='flex items-center gap-8'>
            <motion.ul 
            initial={{opacity:0,x:200}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:200}}
            className='flex items-center gap-8 '>
                    <Link to={'/Products'}>
                        <li className='text-bold hover:font-semibold text-headingColor cursor-pointer
                        hover:underline underline-offset-4 duration-100 transition-all ease-in-out'
                        >Products</li>
                     </Link>
                     <Link to={'/AboutUs'}>
                        <li className='text-base hover:font-semibold text-headingColor cursor-pointer
                        hover:underline underline-offset-4 duration-100 transition-all ease-in-out'
                        >About us</li>
                    </Link> 
               {!user&& (<>
                <Link to={'/Login'}>
                    <li className='text-base hover:font-semibold text-headingColor cursor-pointer
                        hover:underline underline-offset-4 duration-100 transition-all ease-in-out' 
                        >Login</li>
                </Link>
                <Link to={'/Register'}>
                    <li className='text-base hover:font-semibold text-headingColor cursor-pointer
                        hover:underline underline-offset-4 duration-100 transition-all ease-in-out' 
                        >Register</li>
                </Link></> )} 
            </motion.ul>
            {user ? <motion.div initial={{opacity:0,x:200}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:200}}
            className='relative flex items-center justify-center '
            onClick={showCart}>
                <MdOutlineShoppingBag className='text-textcolor text-2xl cursor-pointer' />
                 {
                 cartItems && cartItems.length > 0 && (
                     <div className='absolute -top-0 -right-2 w-4 h-4 rounded-full bg-cartNumBg
                     flex items-center justify-center'>
                        <p className='text-sm text-white font-semibold'>{cartItems.length}</p>
                     </div>
                 )
                 }
                </motion.div>
                : ""}
            

                <div className='relative'>
                <motion.img
                initial={{opacity:0,x:200}}
                animate={{opacity:1,x:0}}
                exit={{opacity:0,x:200}}
                 whileTap={{scale: 0.7 }}
                src={user ? (user.photoURL) : '/avatar.png'} 
                alt='profilePicture'
                className='w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full'
                onClick={login}/>
                
                {
                isMenu &&(
                    <motion.div
                    initial={{opacity: 0,scale:0.7,y:-40}}
                    animate={{opacity: 1,scale:1,y:0}}
                    exit={{opacity: 0,scale:0.7,y:40}}   
                    className='w-40 bg-gray-100 shadow-xl rounded-lg
                    flex flex-col absolute top-12 right-0 py-2'>
                       {
                       user && user.email === "panayotpetkov@gmail.com" && 
                       (
                        <>
                           <Link to={'/createitem'}><p className='px-4 py-2 flex items-center gap-3 cursor-pointer
                           hover:bg-slate-200 transition-all duration-100 ease-in-out
                            text-textColor text-base'
                            onClick={() => setIsMenu(false)}
                            >New Item<MdAdd /></p>
                            </Link>
                            <Link to={'/edititems'}><p className='px-4 py-2 flex items-center gap-3 cursor-pointer
                            hover:bg-slate-200 transition-all duration-100 ease-in-out
                             text-textColor text-base'
                             onClick={() => setIsMenu(false)}
                             >Edit Items</p>
                             </Link>
                             <Link to={'/allorders'}><p className='px-4 py-2 flex items-center gap-3 cursor-pointer
                            hover:bg-slate-200 transition-all duration-100 ease-in-out
                             text-textColor text-base'
                             onClick={() => setIsMenu(false)}
                             >All Orders</p>
                             </Link>

                             </>
                       )
                       }
                       <p className='px-4 py-2 flex items-center gap-3 cursor-pointer
                        hover:bg-slate-200 transition-all duration-100 ease-in-out
                         text-textColor text-base'
                         onClick={logout}
                         >Logout<MdLogout /></p>
                   </motion.div>
                )
                }
                </div>
            </div>
        </div>



        {/* mobile*/ }


        <div className='flex item-center justify-between md:hidden w-full'>
       
        {user ?
        <motion.div initial={{opacity:0,x:200}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:200}}
        className='relative flex items-center justify-center'
        onClick={showCart}>
            <MdOutlineShoppingBag className='text-textcolor text-2xl cursor-pointer' />
       {
            cartItems &&  cartItems.length > 0 &&  (
                <div className='absolute -top-0 -right-2 w-4 h-4 rounded-full bg-cartNumBg
                    flex items-center justify-center'>
                    <p className='text-sm text-white font-semibold'>{cartItems.length}</p>
                </div>
            )
        } 
    
        </motion.div>
        : ""
        }
        

            
                <Link to={'/'} className='flex items-center gap-1'>
                <img src='/logoLarge.png' alt='logo' className='w-20 object-cover' />
                
                </Link>
                

            <div className='relative'>
                <motion.img
                initial={{opacity:0,x:200}}
                animate={{opacity:1,x:0}}
                exit={{opacity:0,x:200}}
                 whileTap={{scale: 0.7 }}
                src={user ? user.photoURL : '/avatar.png'} 
                alt='profilePicture'
                className='w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full'
                onClick={login}/>
                
                {
                isMenu &&(
                    <motion.div
                    initial={{opacity: 0,scale:0.7,y:-40}}
                    animate={{opacity: 1,scale:1,y:0}}
                    exit={{opacity: 0,scale:0.7,y:40}}   
                    className='w-40 bg-gray-100 shadow-xl rounded-lg
                    flex flex-col absolute top-12 right-0 py-2'>
                       {
                       user && user.email === "panayotpetkov@gmail.com" && (
                           <Link to={'/createitem'}><p className='px-4 py-2 flex items-center gap-3 cursor-pointer
                           hover:bg-slate-200 transition-all duration-100 ease-in-out
                            text-textColor text-base justify-center '>New Item<MdAdd /></p>
                            </Link>
                       )
                       }
                       <ul className='flex flex-col '>
                        <li className='text-base text-headingColor cursor-pointer hover:bg-slate-200
                            hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2' 
                            >Home</li>
                        <li className='text-base text-headingColor cursor-pointer hover:bg-slate-200
                            hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2' 
                            >Products</li>
                        <li className='text-base text-headingColor cursor-pointer hover:bg-slate-200
                            hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2' 
                            >About Us</li>
                        <li className='text-base text-headingColor cursor-pointer hover:bg-slate-200
                            hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2' 
                            >Service</li>
                        </ul>
                       <p className='px-4 py-2 flex items-center gap-3 rounded-md shadow-md
                        bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all
                         duration-100 ease-in-out text-textColor justify-center text-base'
                         onClick={logout}
                         >Logout<MdLogout /></p>
                   </motion.div>
                )
                }
                </div>
                

        </div>
        </header>
        
        
  )
}

export default Header