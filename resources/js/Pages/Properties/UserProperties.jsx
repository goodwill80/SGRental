import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { PropertyContext } from '@/Context/PropertyContext';
import Spinner from './Images/spinner.gif'

function UserProperties() {

    const redirect = useNavigate()
    const { id } = useParams();
    const { properties, retrieveProperties, setProperties } = useContext(PropertyContext)
    

    const protectRoute = ()=> {
        axios.get('/api/user')
            .then()
            .catch(err=> {
                // console.log(err)
                redirect('/login')
            })
    }

    useEffect(()=> {
        protectRoute()
        retrieveProperties(id)
    }, [])

    const deletePropertyState = (id) => {
       const newList = properties.filter(property=> property.id !== id)
       setProperties(newList);
    }


    const deleteProperty = async(id)=> {
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
                    deletePropertyState(id)
                Swal.fire({
                icon: 'success',
                title: 'Successfully deleted'
                })
                }
            })
        } catch(err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data.message
            })
        }
    }

    const renderImage = (data)=> {
        if(data.includes('images/')) {
            return `/storage/${data}`;
        } else {
            return data
        }
    }


    if(properties.length > 0) {
        return (
            <div className="mt-20 min-h-full flex flex-col justify-center items-center">
              <div className="w-[65%]">
                <h1 className="text-2xl font-bold mb-4">My Listings</h1>
              </div>
        
                { properties?.map((property, index)=> {
                    return (
                        <div key={index} className="flex h-[220px] w-[60%] justify-center mt-8 shadow-md space-x-8">
                            
                            <div className="w-[30%] flex justify-left">
                                <Link to={`/properties/${property.id}`}>
                                    <img className="object-fit h-[190px] w-[300px] rounded-md" src={renderImage(property.thumbnail)} alt="image" />
                                </Link>
                            </div>
                            <div className="w-[30%] p-4">
                                <h1 className="text-lg font-bold">{property.name}</h1>
                                <p>Asking: SGD${property.price} per month</p>
                                <h2 className="text-red-900 font-bold mt-2">Agent:</h2>
                                <p>{property.user.name}</p>
                            </div>
                          
                            <div className="w-[40%] h-[300px] flex-col justify-center items-center mt-8">
                                <div className="flex justify-center items-end space-x-3 pt-24">
                                    <Link to={`/properties/edit/${property.id}`}>
                                        <button className="btn btn-warning btn-sm text-white">Edit</button> 
                                    </Link>
                                    <button onClick={()=>deleteProperty(property.id)} className="btn btn-error btn-sm text-white">Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
              </div>
          )
    } else {
        return (
            <div className="mt-40 flex flex-col justify-center items-center w-[100%]">
                <h1 className="text-red-900 text-2xl">You have not listed any properties</h1>
            </div>
        )
    }
    
        
    

  
}

export default UserProperties
