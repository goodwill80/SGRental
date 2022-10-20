import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PropertyContext } from '@/Context/PropertyContext';
import Swal from 'sweetalert2';


function NavBar() {

  const { cookie, removeCookie, setLoggedUserId } = useContext(PropertyContext);
  const [ id, setId] = useState();
  

  const redirect = useNavigate();

  useEffect(()=> {
    axios.get('/api/user')
      .then(res=>setId(res.data.id))
      .catch(err=>console.log(err))
  }, [cookie])
 

 
  const logout = () => {
    axios.post('/logout')
      .then(res => {
        removeCookie('user');
        Swal.fire({
          icon: 'Success',
          title: `Successfully logged out`
        })
        setLoggedUserId('');
        redirect('/login');
      })
      .catch(err => console.log(err))
  }


  const renderLinks = ()=>{
    if(cookie.user) {
      return (
        <>
        <li><Link to="create">NewRental</Link></li>
        <li><Link to={`user/${id}`}>MyRentals</Link></li>
        <li><button onClick={logout}>Logout</button></li>
        </>
      )
    } else {
      return (
        <>
           <li><Link to="login">Login</Link></li>
           <li><Link to="register">New User?</Link></li>
        </>
      )
    }
  }

  return (
    <Fragment>
        <div className="navbar z-10 fixed top-0 bg-neutral text-neutral-content flex justify-between">
          {/* Left Links */}
          <div>
            <Link to='/' className="btn btn-ghost normal-case text-xl">RentSG</Link>
            <ul className="lg:flex p-2 gap-4">
               {/* <li><Link to="about">About</Link></li> */}
               <li><Link to="properties">Search for Rentals</Link></li>
               {/* <li><Link to="contact">Contact Us</Link></li> */}
            </ul>
          </div>
          {/* Right Links */}
          <div>
            <ul className="hidden lg:flex p-2 gap-4 mr-4">
              { renderLinks() }
            </ul>
          </div>
        </div>
        <Outlet />
    </Fragment>
 
  )
}

export default NavBar
