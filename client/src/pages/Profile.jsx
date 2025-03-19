import { useSelector ,useDispatch} from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {updateUserStart,updateUserFailure,updateUserSuccess} from '../redux/user/userSlice'

export default function profile() {
    const {currentUser, error} = useSelector((state )=>state.user)
    const [updateSuccess,setUpdateSuccess] = useState(false)

    const fileref  = useRef(null)
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)
    const [image, setImage] = useState(undefined)
    const [imageUrl, setImageUrl] = useState('') 

    const [formData, setFormData] = useState({})
    console.log(image);

    useEffect(() => {
      if (image) {
        handleFileUpload(image);
      }
    }, [image]);
    

    const handleFileUpload = async (file) => {
      if(!file) return;
      console.log("file" ,file ,image);
      

      setLoading(true) 
 
     const presetKey = import.meta.env.VITE_CLOUDINARY_PRESET;
     const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    //  const presetKey = "web_profile";
    //  const cloudName = "dga5tufyt";
   

     const data = new FormData()
     data.append('file',file)
     data.append('upload_preset',presetKey)
     data.append('cloud_name',cloudName)
 
    
       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
         method:'POST',
         body:data
       });
       const uploadImageURL = await res.json()
       console.log('upload data',uploadImageURL.url);
   
       if (!res.ok) {
         throw new Error(
           data.error?.message || "Upload failed. Please try again."
         );
       }
           // Update the image URL in state
          //  setImage(uploadImageURL.secure_url)
           setImageUrl(uploadImageURL.secure_url)

    
     setLoading(false)      
   }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    dispatch(updateUserStart());

    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const updatedData = {
        ...formData,
        profilePicture: imageUrl || currentUser.profilePicture, 
      };
      console.log("API URL:", `/api/user/update/${currentUser?._id}`);
  
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: 'POST',
        // credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
         },
        body: JSON.stringify(updatedData),
  
      });
      console.log("Submitting update:", updatedData);
      console.log("Token:", currentUser?.token);
      console.log("API URL:", `/api/user/update/${currentUser?._id}`);
  
  
      const data = await res.json();
  
      if(data.success === false){
        dispatch(updateUserFailure(data))
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error)); 
    }
  };

  console.log('infomations--',formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile  </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" name="" id="" ref={fileref} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>

        <img src={imageUrl ||currentUser.profilePicture} alt="" className='h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2'  onClick={()=>fileref.current.click()} />
        
        <input type="text" defaultValue={currentUser.userName} name="username" id="username"  placeholder='username' className='bg-slate-100 rounded-lg p-4 ' onChange={handleChange}/>

        <input type="email" defaultValue={currentUser.email} name="email" id="email" placeholder='email' className='bg-slate-100 rounded-lg p-4 'onChange={handleChange} />

        <input type="password"  name="password" id="password"  placeholder='password'  className='bg-slate-100 rounded-lg p-4 'onChange={handleChange} />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>

      {/* <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p> */}
      <p className='text-green-700 mt-5'>{updateSuccess && 'user is updated successfully...'}</p>

    </div>
  )
}
