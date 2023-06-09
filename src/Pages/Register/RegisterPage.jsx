import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';
import { app, auth } from '../../firebase.config';

import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import Footer from '../../components/Footer';

function RegisterPage() {
  const [{user}, dispatch] = useStateValue();
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
 
  const navigate = useNavigate()
  const loginWithGoogle = async () => {
    const {user :{refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
    dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
    })
    localStorage.setItem("user",JSON.stringify(providerData[0]))
    navigate('/Products')
  }

  const registerUser = (e) => {
    e.preventDefault()
    console.log(email,password,confirmPassword)
    if(password !== confirmPassword){
      toast.error('Passwords do not match!')
    }else if(password.length < 4){
      toast.error('Password must be at least 4 characters long!')
    }else if (!email){
        toast.error('Email is required!')
      }else if (!name){
        toast.error('Name is required!')
      }else if (name.length <4){
        toast.error('Name must be at least 4 characters long!')
      }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false)
    toast.success('User registered successfully!')
    navigate('/Login')
    // ...
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });   
  }
  ;


  return (
    <>
    <ToastContainer />
    {isLoading && <Loader />}
    <div className='justify-center items-center flex flex-col top-0'>
        <motion.section 
        initial={{opacity:0,x:-1000,y:-10}}
        animate={{opacity:1,x:0,y:0}}
        exit={{opacity:0,x:400}}
        className='h-full flex flex-col text-semibold justify-center items-center' >
        <p className="text-xl font-semibold my-2 text-[#121212] flex drop-shadow-xl">Register</p>
            <form onSubmit={registerUser}>
                <input type="text" 
                placeholder="Enter your name"
                 required 
                 onChange={(e) => setName(e.target.value)}
                 className='items-center rounded-xl flex flex-col justify-center h-[38px] my-2 px-2 space-y-4'/>
                <input 
                type='email' 
                className='items-center flex flex-col justify-center my-2 rounded-xl px-2 space-y-4 h-[40px]'
                placeholder='Email' required 
                value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
                <input type="password"
                 placeholder='Enter a password' 
                 required value={password} onChange={(e) => setPassword(e.target.value)}
                 className='items-center flex flex-col justify-center h-[40px] rounded-xl my-2 px-2 space-y-4' />
                <input 
                type="password" 
                placeholder='Confirm password'
                required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
                className='items-center flex flex-col justify-center h-[40px] rounded-xl my-2 px-2 space-y-4'/>
                <button className='ml-0 w-full border-none outline-none justify-center items-center flex flex-col
           bg-[#FEEBD6] ] px-12 py-2 rounded-lg text-lg text-[gray-700] font-bold' type='submit'>Register</button>
               <p className="text-sm font-semibold my-12 justify-center items-center text-[#121212] flex drop-shadow-xl"> or Login with Google</p>
            <button className='ml-0 w-full h-[40px] border-none outline-none justify-center items-center flex flex-col
           bg-[#FEEBD6] ] px-12 py-2 rounded-lg text-lg text-[gray-700] font-bold'
           onClick={loginWithGoogle}>GOOGLE</button>
            </form>
        </motion.section>
    </div>
    <Footer />
    </>
  )
}

export default RegisterPage