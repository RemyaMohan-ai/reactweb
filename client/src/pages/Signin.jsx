
import { useState } from "react"
import {Link ,useNavigate} from 'react-router-dom'

const Signin = () => {
  const[formdata ,setFormdata] = useState({})
  const[loading ,setLoading] = useState(false)
  const[error ,setError] = useState(null)
  const navigate = useNavigate()
 const handleChange = (e)=>{
   setFormdata({...formdata,[e.target.id]:e.target.value})
 }
 console.log(formdata);
 

const handleSubmit =async(e)=>{
  e.preventDefault()
  try {
   setLoading(true);
   setError(false)
   const res = await fetch('/api/auth/signin',{
    method:"POST",
    headers :{
      "Content-Type":'APPlication/json',
    },
    body : JSON.stringify(formdata)
   });
   const data = await res.json()
   console.log(data);
   setLoading(false)
   if(data.success == false){
     setError(true)
     return;
   }
   navigate('/')
   

  }
   catch (error) {
     setLoading(false)
     setError(true)
   
  }

}

 return (
   <div className='p-4 max-w-lg mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7 '>Sign In</h1>
     <div>
       <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
         <input type="email" name="" id="email" placeholder='email'className='bg-slate-100 rounded-md p-3' 
         onChange={handleChange}/>
         <input type="password" name="" id="password" placeholder='password' className='bg-slate-100 rounded-md p-3' 
         onChange={handleChange}/>
         <button disabled={loading} className='uppercase bg-purple-950 text-white rounded-lg p-3 hover:opacity-90 cursor-pointer disabled:opacity-70 '> {loading ? 'Loading...' : 'Sign In'}</button>
       </form>
     </div>
     <div className='flex pt-4'>
       <h1>Dont have an account ? </h1>
       <Link to={'/signup'}>
       <span className='p-3 text-sky-800 text-sm'>SIgnUp</span>

       </Link>
     </div>
     <p>{error && "something went wrong"}</p>
   </div>
 )
}

export default Signin
