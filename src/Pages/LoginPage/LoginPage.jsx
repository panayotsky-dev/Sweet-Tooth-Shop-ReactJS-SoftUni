import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';
import { app, auth } from '../../firebase.config';
import { useStateValue } from '../../context/StateProvider';

function LoginPage() {
    const [{user}, dispatch] = useStateValue();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
 
  const [isLoading,setIsLoading] = useState(false)
 
  const navigate = useNavigate()

  const loginUser = (e) => {
    e.preventDefault()
    console.log(email,password)
    if(password.length < 4 ){
      toast.error('Password must be at least 4 characters long!')
    }else if (!email){
        toast.error('Email is required!')
    }
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false)
    console.log(user.providerData[0])
       
        
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
    <div className='justify-center items-center flex flex-col'>
        <section className='h-screen justify-center items-center' >
        Register
            <form onSubmit={loginUser}>
                <input 
                type='email' 
                placeholder='Email' required 
                value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className=''/>
                <input type="password" placeholder='Enter a passowrd' required value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button type='submit'>Login</button>
            </form>
        </section>
    </div>
    </>
  )
}

export default LoginPage