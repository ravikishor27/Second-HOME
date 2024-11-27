import React from 'react'
import { Link } from 'react-router-dom'

export default function signup() {
  return (
    <div className='p-3 max-w-lg mx-auto items-center'>
      <h1 className='text-3xl text-center my-7 font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
      <input type='text' placeholder='Username' id='username' className='border rounded-lg p-3'/>
      <input type='email' placeholder='email' id='email' className='border rounded-lg p-3'/>
      <input type='password' placeholder='Password' id='password' className='border rounded-lg p-3'/>
      <button className='p-3 bg-slate-700 rounded-xl border text-white hover:bg-opacity-95 disabled:opacity-80'>SIGN UP </button>
      </form>
     <div className='flex gap-2 mt-3'>
      <p> Have an account?</p>
      <Link to={"/Signin"}>
        <span className='text-blue-500'>Sign in</span>
      </Link>
     </div>
    </div>
  )
}
