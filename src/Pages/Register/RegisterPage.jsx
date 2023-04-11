import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';
import { app, auth } from '../../firebase.config';

function RegisterPage() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
 
  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault()
    console.log(email,password,confirmPassword)
    if(password !== confirmPassword){
      toast.error('Passwords do not match!')
    }else if(password.length < 4){
      toast.error('Password must be at least 4 characters long!')
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
    <div className='justify-center items-center flex flex-col'>
        <section className='h-screen justify-center items-center' >
        Register
            <form onSubmit={registerUser}>
                <input 
                type='email' 
                placeholder='Email' required 
                value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className=''/>
                <input type="password" placeholder='Enter a passowrd' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='Confirm password' required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                <button type='submit'>Register</button>
            </form>
        </section>
    </div>
    </>
  )
}

export default RegisterPage