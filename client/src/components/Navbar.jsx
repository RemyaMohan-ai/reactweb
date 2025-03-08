import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {
  const {currentUser} = useSelector((state) => state.user)
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
                <Link to={'/profile'}>
                {currentUser ? (
                  <img src= {currentUser.profilePicture} alt="profile" className='h-7 w-7 rounded-full object-cover'/>
                ) : (
                <li>Sign In</li>
              )

                }
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
