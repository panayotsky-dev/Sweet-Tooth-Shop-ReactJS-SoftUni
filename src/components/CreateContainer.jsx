import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {MdFastfood,MdCloudUpload,MdDelete,MdFoodBank,MdArrowDropDown,MdAttachMoney} from 'react-icons/md'
import { categories } from '../utils/data'
import Loader from './Loader'
import { storage } from '../firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { getAllProducts, saveItem } from '../utils/firebaseFn'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
function CreateContainer() {
  
const [title,setTitle]= useState('')
const [imageAsset,setImageAsset] = useState(null)
const [description,setdescription] = useState('')
const [price,setPrice] = useState('')
const [category,setCategory] = useState(null)


const [msg,setMsg] = useState('')
const [isLoading,setIsLoading] = useState(false)
const [alertStatus,setAlertStatus] = useState('Danger');
const [fields,setFields] = useState(true)
const [{uploadedProducts},dispatch] = useStateValue();
const uploadImage = (e) => {
  setIsLoading(true);
  const imageFile = e.target.files[0]
  // console.log(imageFile)
  const storageReference = ref(storage,`Images/${Date.now()}-${imageFile.name}`)
  // Date.now() + - + imageFile.name is a method to make the image name unique
  const uploadTask = uploadBytesResumable(storageReference,imageFile)
  //when the state start to changing will throw 3 functions  - snapshop - error - complete/upload complete/get download url
  uploadTask.on('state_changed',(snapshop) => {
    //snapshotp means the state of the image
    // we are adding a listener to the upload task
    const progress = (snapshop.bytesTransferred / snapshop.totalBytes) * 100
    // console.log(progress)
  } 
  , (error) => {
    // console.log(error)
    // setIsLoading(false)
    // setMsg(error.message)
    // setAlertStatus('Danger')
    // setFields(false)
    console.log(error);
    setFields(true);
    setMsg(`Error while uploading: ${error.message}`);
    setAlertStatus('Danger');
    setTimeout(() => {
      setFields(false)
      setIsLoading(false)
    }, 3000);
  }
  , () => {
    getDownloadURL(uploadTask.snapshot.ref)
    .then(downloadUrl =>{
      setImageAsset(downloadUrl)
      setIsLoading(false);
      setFields(true);
      setMsg('Image uploaded seccessfully!');
      setAlertStatus('Success');
      setTimeout(() => {
        setFields(false)
      }, 3000);
    })
  })

};
const deleteImage = () => {
  setIsLoading(true);
  const deleteReference = ref(storage,imageAsset)
  deleteObject(deleteReference).then(() =>{
    setImageAsset(null)
    setIsLoading(false)
    setFields(true);
      setMsg('Image deleted seccessfully!');
      setAlertStatus('Success');
      setTimeout(() => {
        setFields(false)
      }, 3000);
  })
};
const saveDetails = () => {
  setIsLoading(true);
  try{
    if(!title || !imageAsset || !description || !price || !category || !category == 'Select Category'){
      // throw new Error('Please fill all the fields!')
      setFields(true);
    setMsg('Please fill all the fields!');
    setAlertStatus('Danger');
    setTimeout(() => {
      setFields(false)
      setIsLoading(false)
    }, 3000);
    }else{
      const item = {
        id:`${Date.now()}`,
        title,
        imageUrl:imageAsset,
        category,
        description,
        price,
        quantity: 1,
      }
      saveItem(item)
      setIsLoading(false)
      setFields(true);
        setMsg('Item was uploaded seccessfully!');
        setAlertStatus('Success');
        clearItem()
        setTimeout(() => {
          setFields(false)
          
        }, 3000);
    }

  }catch(error){
    console.log(error);
    setFields(true);
    setMsg('Error while saving details!');
    setAlertStatus('Danger');
    setTimeout(() => {
      setFields(false)
      setIsLoading(false)
    }, 3000);

  }
  fetchItems()
};
const clearItem = () =>{
  setTitle('')
  setImageAsset(null);
  setCategory('Select Category')
  setPrice('')
  setdescription('')
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
    <div className='w-full min-h-screen flex items-center justify-center h-auto  '>
      <div className='w-[90%] md:w-[50%] lg:w-[40%] border border-slate-500 rounded-lg p-4
      flex flex-col items-center justify-center gap-1 '>
        {
        fields && (
          <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className={`w-full p2 rounded-lg text-center text-lg font-semibold ${
          alertStatus==='Danger' 
          ? "bg-red-400 text-red-800" 
          :" bg-emerald-400 text-emerald-800"}`}>
          {msg}
          </motion.p>
        )
        }

        <div className='w-full py-2 border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-xl text-gray-700'/>
          <input 
          type='text' 
          required 
          value={title} 
          placeholder='Title will be...'
          className='w-full h-full text-lg bg-transperent
           font-semibold outline-none border-none placeholder:text-gray-400 rounded-md text-textColor'
          onChange={(e)=>setTitle(e.target.value)}
          />          
        </div>
        <div className='w-full'>
        
          <select 
          onChange={(e) => setCategory(e.target.value)}
          className="outline-none w-full text-baase border-b-2 border-gray-400 
          p-2 rounded-md cursor-pointer " 
          >
            <option value="other" className='bg-white'>
            Select Category
              </option>
              {categories && categories.map((category) => (
                <option key={category.id} 
                className="text-base border-0 outline-none capitalize text-headingColor"
                value={category.urlParamName}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className='group flex justify-center items-center flex-col border-2 
        border-dotted border-black w-full h-225 
        md:h-420 cursor-pointer rounded-lg'>
          { 
          isLoading 
          ? <Loader /> 
          : (<>
            {!imageAsset 
            ? (<>
            <labe className="w-full h-full flex flex-col items-center  justify-center cursor-pointer">
              <div className='w-full h-full flex flex-col items-center justify-center '>
                <MdCloudUpload 
                className='text-4xl text-gray-400 hover:text-[#FEEBD6] hover:drop-shadow-sm'/>
                <p className='text-gray-400 hover:text-[#FEEBD6] hover:drop-shadow-sm font-semibold '>
                  Choose image to upload
                  
                </p>

                
              </div>
              <input 
              type="file" 
              name="uploadImage" 
              accept="image/*"
              onChange={uploadImage} 
              className=' -mt-10'
              />              
            </labe>
            </>) : (<><div className='relative h-full'>
              <img src={imageAsset} alt='uploadedImage' className='w-full h-full object-cover'/>
              <button type="button" className='absolute bottom-3 right-3 p-3 rounded-full
               bg-red-500 text-xl cursor-pointer hover:shadow-md duration-500 transition-all ease-in-out'
               onClick={deleteImage}><MdDelete className='text-white'/></button>
              </div>
              </>)}
            </>)}

          
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFoodBank className='text-gray-700 text-2xl'/>
            <input 
            type='text' 
            required 
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder='description' 
            className='w-full h-full text-lg bg-opacy-10 rounded-md
            outline-none border-none placeholder:text-gray-400 font-semibold'/>
          </div>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='text-gray-700 text-2xl'/>
            <input 
            type='number' 
            required 
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
            placeholder='Price' 
            className='w-full h-full text-lg bg-opacy-10 rounded-md
            outline-none border-none placeholder:text-gray-400 font-semibold'/>
          </div>
          
        </div>
        <div className='flex items-center w-full'>
          <motion.button 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileTap={{scale:0.9}}
          type='button' 
          className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none
           bg-[#FEEBD6] ]    px-12 py-2 rounded-lg text-lg text-[gray-700] font-bold'
           onClick={saveDetails}>
            Submit
            </motion.button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer