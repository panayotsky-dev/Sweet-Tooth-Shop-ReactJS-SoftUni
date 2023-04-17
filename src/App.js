import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import {Route,Routes} from 'react-router-dom'
import MainContainer from './components/MainContainer'
import CreateContainer from './components/CreateContainer'
import { AnimatePresence } from 'framer-motion'
import { getAllProducts } from './utils/firebaseFn'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import ProductPage from './components/ProductPage'
import AboutUsPage from './components/AboutUsPage'

import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/Register/RegisterPage'
import { fetchUser } from './utils/fetchingLocalStorageData'
import ItemPage from './components/ItemPage'
import CheckOutPage from './components/CheckOutPage'
import ErrorPage from './components/ErrorPage'
import EditItems from './Pages/EditItems/EditItems'



function App() {
  
  const [{user,uploadedProducts},dispatch] = useStateValue();

  const fetchItems = async () => {
    await getAllProducts().then(item=>{
      dispatch({
        type: actionType.SET_Uploded_Products,
        uploadedProducts: item})
      console.log(item)
    })
  }
  useEffect(()=> {
    fetchItems()
  },[])
  
  return (
    <AnimatePresence >
        <div className='sexygradient'> 
        
        
      <Header />

      <main className='mt-14 md:mt-20 px-4 md:p-16 py-4 w-full h-full '>
        <Routes>
          <Route path='/*' element={<MainContainer />}/>          
          {!user ? <Route path='/login' element={<LoginPage />} /> : <Route path='/login' element={<ErrorPage />} />}
          {!user ?<Route path='/register' element={<RegisterPage />} /> : <Route path='/register' element={<ErrorPage />} />}
          <Route path='/products' element={<ProductPage />}/>
          <Route path='/aboutus' element={<AboutUsPage />}/>
          {user && user.email === 'panayotpetkov@gmail.com' ?<Route path='/createitem' element={<CreateContainer />}/> : <Route path='/createitem' element={<ErrorPage />} />}
          {user && user.email === 'panayotpetkov@gmail.com' ?<Route path='/edititems' element={<EditItems />}/> : <Route path='/edititems' element={<ErrorPage />} />}
          <Route path='/Products/*' element={<ItemPage product={uploadedProducts?.filter(product => product.id)} />}/>
          {user ? <Route path='/checkout' element={<CheckOutPage />}/> : <Route path='/checkout' element={<ErrorPage />} />}
        </Routes>
      </main>
      
      </div>
      
    </AnimatePresence>
  
  )
}

export default App