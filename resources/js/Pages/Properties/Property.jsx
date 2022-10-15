import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Footer from '@/Layouts/Home/Footer'
import { PropertyContext } from '@/Context/PropertyContext'
import Spinner from './Images/spinner.gif'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaThumbsUp } from "react-icons/fa";

function Property() {
  
    const { id } = useParams();
    const redirect = useNavigate();
    const { property, setSingleProperty } = useContext(PropertyContext)
    const [ loggedUserId, setLoggedUserId ] = useState()


    const get_logged_userId = ()=> {
        axios.get('/api/user')
            .then(res=>{
                console.log(res.data)
                setLoggedUserId(res.data.id)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=> {
        get_logged_userId();
        axios.get(`/api/properties/${id}`)
            .then(res=> setSingleProperty(res.data.data))
            .catch(err=> console.log(err))
    }, [])

    const renderImage = (data)=> {
        if(data.includes('images/')) {
            return `/storage/${data}`;
        } else {
            return data
        }
    }

    const deleteProperty = async()=> {
        try{
            await Swal.fire({
                title: 'Delete this post?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#EF4444',
                cancelButtonText: 'No',
                cancelButtonColor: '#A3A3A3',
                reverseButtons: true,
                forcusCancel: true
            }).then(result => {
                if(result.isConfirmed) {
                    axios.delete(`/api/properties/${id}`);
                Swal.fire({
                icon: 'success',
                title: 'Successfully deleted'
                })
            redirect('/properties');
                }
            })
        } catch(err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data.message
            })
        }
    }

    const renderButtons = ()=> {
        if(loggedUserId === property.user.id) {
            return (
                <div className="flex space-x-3 pt-4">
                <Link to={`/properties/edit/${id}`}>
                    <button className="btn btn-warning btn-sm text-white">Edit</button> 
                </Link>
                   <button onClick={deleteProperty} className="btn btn-error btn-sm text-white">Delete</button>
                </div>
            )
        }
    }
 
  if(!property.name) {
    return (
        <div className="h-[800px] flex flex-col justify-center items-center">
            <img className="w-[20%]" src={Spinner} alt="spinner" />
        </div>
    )
  }

  return (
    <>
    <div className="mt-20 min-h-full w-[1200px] mx-auto mb-8 flex flex-col justify-center items-center">
      {/* TITLE AND HEADER */}
      <div className="title w-[100%]">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <div className="flex justify-between items-center mx-auto my-8">
            <div className="flex space-x-1">
                <h1 className="text-sm text-red-800 border-solid border-2 border-red-300 p-1 px-2 rounded-md">
                    {property.category.name}
                </h1>
                <h1 className="text-sm text-blue-800 border-solid border-2 border-blue-300 p-1 px-2 rounded-md">
                    {property.room_category.name}
                </h1>
                <h1 className="text-sm flex items-center justify-center space-x-3 text-green-800 w-[80px] border-solid border-2 border-green-300 p-1 px-2 rounded-md">
                    <FaThumbsUp />
                    <h1 className="ml-2">{property.ratings}</h1>
                </h1>
            </div>
            <div className="flex justify-center items-center space-x-1">
            <button className="btn btn-info text-white btn-sm">Share</button>
                <button className="btn btn-success text-white btn-sm">Like</button>
                <a href="#contact">
                    <button className="btn btn-error text-white btn-sm">Contact</button>
                </a>
            </div>
        </div>
      </div>
     
      {/* MAIN CONTAINER FOR IMAGE AND DETAILS */}
      <div className="main-container w-[100%] flex flex-row justify-between space-x-8">
        {/* image */}
        <div className="prop w-[70%] h-full">
            <img className="w-[100%] h-[500px] rounded-lg" src={renderImage(property.thumbnail)} alt='property' />
        </div>
        {/* details */}
        <div className="agent-info w-[30%] h-full font-bold space-y-8">
            <h1 className="text-2xl font-bold">S$ {property.price} /mo</h1>
            <h1 className="text-1xl">3350sft S$2.69</h1>
            <div>
                <h1 className="text-2xl text-red-900">{ property.name }</h1>
                <p>55, Canberra Ave, Singapore 123456</p>
            </div>
            <div>
                <h1 className="text-red-900">Nearby Stations</h1>
                <p>5 mins (480m) to Canberra MRT</p>
            </div>
            <div>
                <h1 className="text-red-900">Description</h1>
                <p>{property.description}</p>
            </div>
            { renderButtons() }
        </div>
      </div>
      
      <div id="contact"className="w-full mt-4">
        <h1 className="text-3xl font-bold pl-2">Contact Agent</h1>
      </div>
      
      <div className="w-full mt-4 bg-gray-200 p-4 rounded-md flex justify-center items-center">
        {/* Left Container */}
        <div className="w-[45%] py-4">
            <div className="flex justify-between items-center mx-4">
                <label className="text-md" htmlFor="name">Name </label>
                <input className="border-none w-[350px] rounded-lg text-sm" type="text" name="name" placeholder="Name" />
            </div>

            <div className="flex justify-between items-center mx-4 mt-4">
                <label htmlFor="name">Mobile </label>
                <input className="border-none w-[350px] rounded-lg text-sm" type="text" name="mobile" placeholder="Mobile" />
            </div>

            <div className="flex justify-between items-center mx-4 mt-4">
                <label htmlFor="name">Email </label>
                <input className="border-none w-[350px] rounded-lg text-sm" type="text" name="email" placeholder="Email" />
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
                <button className="btn btn-alert btn-error text-white">
                    I'm interested
                </button>
            </div>
        </div>

        {/* Right Container */}
        <div className="w-[45%] py-4 flex flex-col items-center justify-center space-y-2">
            <img className="rounded-full w-[10%] h=[5%]" src="https://www.hongrayphoto.com/wp-content/uploads/2021/03/Singapore-Passport-Studio-Photo-9.jpg" alt="photo" />
            <p className="text-sm text-red-500">{property.user.name}</p>
            <div className="flex flex-col justify-center items-center">
                <p className="text-gray-400 text-sm font-bold">PROPERTY NEX PTE LTD</p>
                <p className="text-sm">CEA License No. R1234567/098765K</p>
            </div>
            <img className="w-[20%]" src="https://cdn-cms.pgimgs.com/news/2015/06/ERA-logo-final.png" alt="photo" />
        </div>

      </div>
    </div>
    <Footer />
    </>
  )
}

export default Property
