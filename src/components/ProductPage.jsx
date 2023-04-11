import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer'

import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

import CartContainer from './CartContainer'

import { categories } from '../utils/data'

function ProductPage() {
    const [{uploadedProducts,cartShow},dispatch] = useStateValue() 
    const [selectedCategory,setSelectedCategory] = useState('all')
    console.log(selectedCategory)

  return (
   <div className='h-screen w-full'>
    <div className='w-full h-full relative flex-col items-center justify-center 
    bg-opacity-20 rounded-md py-6 px-6  bg-slate-600
    '>
          <section className='w-full my-2 ' id="menu">
        <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-3xl font-semibold my-2 capitalize text-[#FEEBD6] relative drop-shadow-xl
             '>
              Select Product Category
            </p>
            <div className='w-full flex items-center justify-center lg:justify-center gap-6 py-6 '>
               {categories && categories.map((category) => (
                 <div key={category.id} onClick={() => setSelectedCategory(category.name)}className='group bg-[#BFA5A5] w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col
                 gap-3 items-center justify-center hover:bg-[#FFC5FF]' >
                     <div className='w-12 h-12 rounded-full bg-[#FFC5FF] group-hover:bg-gray-400 flex items-center justify-center'>
                       <img src={category.img} className='text-cardColor group-hover:text-white w-8 text-lg'/>
                     </div>
                     <p className='text-sm text-textColor font-semibold '>{category.name}</p>
                 </div>
               ))}
            </div>
        </div>
    </section>
        
        <section className='w-full mt-2 '>
          <div className='w-full flex items-center justify-center '>
            <p className='text-3xl font-semibold capitalize drop-shadow-xl text-[#00767F] relative'>
              Our Delicious Products
            </p>
           
            
          </div>
          <RowContainer flag={true}  
          products={selectedCategory =='all'
            ? uploadedProducts 
            : uploadedProducts?.filter(product => product.category === selectedCategory.toLowerCase())
          } 
           />
        
        
        {cartShow&&(
          <CartContainer />
        )}
          </section>
        
    </div>
   
    
    </div>
  )
}

export default ProductPage