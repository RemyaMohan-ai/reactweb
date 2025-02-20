import React from 'react'
import {Link} from 'react-router-dom'
const Signup = () => {
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>signup</h1>
      <div>
        <form action="" className='flex flex-col gap-5'>
          <input type="text" name="" id="userName" placeholder='username' className='bg-slate-100 rounded-md p-3'/>
          <input type="email" name="" id="email" placeholder='email'className='bg-slate-100 rounded-md p-3'/>
          <input type="password" name="" id="password" placeholder='password' className='bg-slate-100 rounded-md p-3'/>
          <button className='uppercase bg-purple-950 text-white rounded-lg p-3 hover:opacity-90 cursor-pointer disabled:opacity-70 '>signup</button>
        </form>
      </div>
      <div className='flex pt-4'>
        <h1> Have an account?  </h1>
        <Link to={'/signin'}>
        <span className='p-3 text-sky-800 text-sm'>Signin</span>

        </Link>
      </div>
    </div>
  )
}

export default Signup
