import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function Register() {

  const redirect = useNavigate();

  const [ credentials, setCredentials ] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [ errors, setErrors ] = useState({})

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=> {
    axios.post('/register', credentials)
      .then(res=> {
          console.log(res.data)
          Swal.fire({
            icon: 'Success',
            title: 'User successfully created. Please log in.'
          })
          redirect('/login')
      })
      .catch(err=> {
        setErrors(err.response.data.errors)
        Swal.fire({
          icon: 'Error',
          title: err.response.data.message
        })
      })
  }

  const errorMsg = (type)=> {
    return (
      <div>
         <div className="text-red-600 mb-4">
        { errors?.[type]?.map((msg, index)=> (
          <p key={index}>{msg}</p>
        ))}
      </div>
      </div>
    )
  }



  return (
    <div className="px-4">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        onChange={handleChange}
                        placeholder="Full Name" />
                    { errorMsg('name')}
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email" />
                     { errorMsg('email')}
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password" />
                       { errorMsg('password')}
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password_confirmation"
                        onChange={handleChange}
                        placeholder="Confirm Password" />
                    <button
                        type="submit"
                        onClick={ handleSubmit }
                        className="btn btn-success w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the <span> </span>
                        <a className="no-underline text-blue-500" href="#">
                            Terms of Service
                        </a> and <span> </span>
                        <a className="no-underline text-blue-500" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?<span> </span>
                    <a className="no-underline border-b border-blue text-blue-500" href="../login/">
                         Log in
                    </a>.
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Register
