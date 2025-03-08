import React from 'react'
import { useSelector } from 'react-redux'

export default function profile() {
    const {currentUser} = useSelector((state )=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>profile</h1>
      <form action="" className='flex flex-col gap-4'>
        <img src={currentUser.profilePicture} alt="" className='h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2' />
        <input type="text" name="" id=""  placeholder='username' className='bg-slate-100 rounded-lg p-4 ' />
        <input type="email" name="" id=""  placeholder='email' className='bg-slate-100 rounded-lg p-4 ' />
        <input type="password" name="" id=""  placeholder='password' className='bg-slate-100 rounded-lg p-4 ' />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
