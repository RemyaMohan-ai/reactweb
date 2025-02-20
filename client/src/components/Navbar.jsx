import {Link} from 'react-router-dom'

import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gray-400 '>
        <div  className='p-5 flex justify-between items-center'>
            <h1 className='font-bold'>React App</h1>
            <ul className='flex gap-4 cursor-pointer'>
                <Link to={'/'}>
                <li>Home</li>
                </Link>
                <Link to={'/about'}>
                <li>About</li>
                </Link>
                <Link to={'/signin'}>
                <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
