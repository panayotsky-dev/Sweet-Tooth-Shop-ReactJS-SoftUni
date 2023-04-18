import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';
import { app, auth } from '../../firebase.config';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import Footer from '../../components/Footer';

function LoginPage() {
    const [{user}, dispatch] = useStateValue();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
 
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

  const loginUser = (e) => {
    e.preventDefault()
    console.log(email,password)
    if(password.length < 6 ){
      toast.error('Password must be at least 6 characters long!')
    }else if (!email){
        toast.error('Email is required!')
    }
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const asd = userCredential.user;
    console.log(asd)
    setIsLoading(false)
    console.log(asd.providerData[0])
       
    dispatch({
      type: actionType.SET_USER,
      user: asd.providerData[0],
  })
  localStorage.setItem("user",JSON.stringify(asd.providerData[0]))
    toast.success('Login successful!')
    navigate('/Products')
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
    <div 
    
    className='justify-centeritems-center flex flex-col'>
        <motion.section 
        initial={{opacity:0,x:-1000,y:-10}}
        animate={{opacity:1,x:0,y:0}}
        exit={{opacity:0,x:400}}
        className='h-full flex flex-col justify-center items-center' >
        <p className="text-xl font-semibold my-2 text-[#121212] flex drop-shadow-xl">Login</p>
            <form onSubmit={loginUser}>
                <input 
                type='email' 
                placeholder='Email' required 
                value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className='items-center flex flex-col justify-center my-2 px-2 h-[40px] rounded-xl space-y-4'/>
                <input type="password"
                 placeholder='Enter a passowrd'
                  required value={password} onChange={(e) => setPassword(e.target.value)} 
                  className='items-center flex flex-col justify-center my-2 px-2 h-[40px] rounded-xl space-y-4'/>
                
                <button type='submit' className='ml-0 w-full h-[40px] border-none outline-none justify-center items-center flex flex-col
           bg-[#FEEBD6] ] px-12 py-2 rounded-lg text-lg text-[gray-700] font-bold'
                >Login</button>
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

export default LoginPage