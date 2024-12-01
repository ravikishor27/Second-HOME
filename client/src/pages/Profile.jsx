import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input id='username' type="text" placeHolder='username' className='border p-3 rounded-lg'/>
        <input id='email' type="email" placeHolder='email' className='border p-3 rounded-lg'/>
        <input id='password' type="text" placeHolder='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 p-3'>Update</button>
      </form>
      <div className='flex flex-row justify-between mt-4'>
        <span className='text-red-700'>Delete Account</span>
        <span className='text-red-700'>Sign Out</span>
      </div>
    </div>
  )
}
