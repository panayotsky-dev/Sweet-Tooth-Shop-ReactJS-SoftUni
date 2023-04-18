import React from 'react'
import EditItemsContainer from '../../components/EditItemsContainer'
import { useStateValue } from '../../context/StateProvider'


function EditItems() {

    const [{uploadedProducts,cartShow},dispatch] = useStateValue()
    console.log(uploadedProducts)

  return (
    <div className=' w-full '>
        <div className='w-full h-full relative flex-col items-center justify-center 
        bg-opacity-20 rounded-md py-6 px-6  bg-slate-600
        '>
            <EditItemsContainer products={uploadedProducts} />
         
        </div>
    </div>
  )
}

export default EditItems
