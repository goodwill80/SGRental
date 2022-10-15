import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PropertyContext } from '@/Context/PropertyContext';
import Swal from 'sweetalert2';


function Login() {
  const redirect = useNavigate();
  const { setCookie } = useContext(PropertyContext);


  // STATE - CREDENTIALS
  const [ credentials, setCredentials ] = useState({
      email: '',
      password: ''
  });
  const { email, password } = credentials;

  const [ errors, setErrors ] = useState({})

  // HANDLE CHANGE
  const handleChange = (e)=> {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  // API TO LOGIN
  const handleSubmit = (e)=> {
    e.preventDefault();
    axios.post('/login', credentials)
      .then(res=> {
        setCookie("user", res.data.remember_token, {
          path: "/"
        });
        Swal.fire({
          icon: 'Success',
          title: `Welcome back, ${res.data.name}!`
        })
        redirect('/properties')
      })
      .catch(err =>{
        setErrors(err.response.data.errors)
        Swal.fire({
          icon: 'Error',
          title: err.response.data.message
        }) 
      } )
  }

  const renderErrorMsg = (type) => {
    return (
      <div className="text-red-600 mt-1">
        { errors?.[type]?.map((msg, index)=> (
          <p key={index}>{msg}</p>
        ))}
      </div>
    )
  }


  return (
    <div className="px-4">
    <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Email" />
                  { renderErrorMsg('email') }
                  <input 
                      type="password"
                      className="block border border-grey-light w-full p-3 rounded mb-4 mt-8"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Password" />
                   { renderErrorMsg('password') }
                  <button
                      type="submit"
                      className="btn btn-success w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 mt-4"
                  >Login</button>
                </form>
              </div>
          </div>
      </div> 
  </div>
  )
}

export default Login
