 import React from 'react'
 import { useSelector } from 'react-redux'

 const Home = () => {
  const {currentUser} = useSelector((state) => state.user)

   return (
     <div>
       <h1 className='font-bold text-lg '>Home</h1>
       <p>welcome {currentUser? currentUser.username:""}</p>
     </div>
   )
 }
 
 export default Home
 