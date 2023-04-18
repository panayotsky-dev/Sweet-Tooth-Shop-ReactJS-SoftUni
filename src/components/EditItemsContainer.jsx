import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router';
import { useStateValue } from '../context/StateProvider'
import { deleteItem, getAllProducts,updateItem } from '../utils/firebaseFn'
import { actionType } from '../context/reducer'

function EditItemsContainer({products}) {
    const [{uploadedProducts,cartShow},dispatch] = useStateValue()
    const [title,setTitle]= useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')

const updateProduct = (id,title,description,price) =>{
    
    if(title.length < 1) {
        setTitle(uploadedProducts[id].title)
        console.log(title)
    } 
    if(description.length < 1){
        setDescription(uploadedProducts[id].description)
        console.log(description)
    }
    price.length < 1 ? setPrice(uploadedProducts[id].price) : setPrice(price)
    console.log(description)
    const item = {
        id,
        title,
        imageUrl: uploadedProducts[id].imageUrl,
        category: uploadedProducts[id].category,
        description,
        price,
        quantity: 1,
      }
      updateItem(item)     
}

const fetchItems = async () => {
    await getAllProducts().then(item=>{
      dispatch({
        type: actionType.SET_Uploded_Products,
        uploadedProducts: item})
      console.log(item)
    })
  }

    
  return (
    <div>
        
       {products &&
        products.map((product)=>(
            <div 
            key={product?.id} 
            className='w-full h-auto bg-[#FEEBD6]  my-2  bg- rounded-lg p-2 shadow-md backdrop-blur-lg
            bg-gradient-to-tr hover:from-[#93d4d7] hover:t-[#f9b8b9] flex flex-row items-center justify-around'>
                <div className='w-full flex items-center justify-between' >
                    <motion.img  
                    whileTap={{scale:0.9}}
                    whileHover={{scale:1.2}}
                    src={product?.imageUrl} 
                    alt=''
                    className='w-[240px] h-[240px] rounded-lg translate-x-0 bg-[#CDCDCD] hover:bg-transparent 
                    bg-repeat:none' 
                    />               
                </div >
                <div className='w-full flex flex-col gap-2 mt-2 '>
                <p className='font-semibold'>Title : {product.title}</p>
                    <input className='text-textColor w-[300px] h-[30px] rounded-xl font-semibold text-base md:text-lg'
                    placeholder='Update product title'
                    onChange={(e) => setTitle(e.target.value)}/>
                    
                    
                    <p className='font-semibold '>Price : {product.price}</p>
                    <input type="number"
                     placeholder='Update product price'  
                     className='text-textColor w-[300px] h-[30px] rounded-xl font-semibold   text-base md:text-lg'
                     onChange={(e) => setPrice(e.target.value)}/> 
                    <p className='font-semibold'>Description : {product.description}</p>
                    <input type='text' 
                    placeholder='Update product description' 
                    className="text-textColor w-[300px] h-[30px] rounded-xl font-semibold text-base md:text-lg" 
                    onChange={(e) => setDescription(e.target.value)}/>        
                    <div className='flex items-center gap-2 -mt-2'>
                        <p className='font-bold'>Product Id:</p>
                       <p className='font-semibold space-x-2'>{product.id}</p>
                    </div>
                    
                </div>
                <button className='w-[10%] p-2 rounded-full bg-slate-600 text-red-300 text-lg font-bold mb-8 mt-4 px-4 mx-4' onClick={()=> deleteItem(product.id)}>Delete</button>
                <button className='w-[20%] p-2 rounded-full bg-slate-600 text-[#FEEBD6] text-lg font-bold mb-8 mt-4 px-4 mx-4' onClick={() => updateProduct(product.id,title,description,price)}>Edit</button>
            </div> 
        ))}
    </div>
  )
}

export default EditItemsContainer