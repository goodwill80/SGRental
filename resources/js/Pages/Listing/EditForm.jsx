import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PropertyContext } from '@/Context/PropertyContext';
import axios from 'axios';
import Swal from 'sweetalert2';


function EditForm() {

    const {id} = useParams();
    const redirect = useNavigate();
    
    const { categories, roomCategories, retrieveCategories, retrieveRoomCategories } = useContext(PropertyContext)
    const [ property, setProperty ] = useState({
        name: '',
        price: '',
        description: '',
        category_id: '',
        room_category_id: '',
        user_id: '',
        thumbnail: '',
        errors: {}
    });
    const [imageFile, setImageFile ] = useState({});
    
    const retrieveProperty = (id)=> {
        axios.get(`/api/properties/${id}`)
            .then(res=> {
                const { name, 
                        price, 
                        description, 
                        category, 
                        room_category,
                        user,
                        thumbnail} = res.data.data;
                setProperty({
                    name: name,
                    price: price,
                    description: description,
                    category_id: category.id,
                    room_category_id: room_category.id,
                    user_id: user.id,
                    thumbnail: thumbnail
                })
            })
            .catch(err=>{
                console.log(err.response.data.errors)
            })
    }

    
    useEffect(()=> {
        retrieveCategories();
        retrieveRoomCategories();
        retrieveProperty(id);
        axios.get('/api/user')
            .then()
            .catch(err=> {
                console.log(err);
                redirect('/login')
            })
    }, [])

    const editProperty = ()=> {
        const data = new FormData();
        data.append('name', property.name)
        data.append('price', property.price)
        data.append('description', property.description)
        data.append('category_id', property.category_id)
        data.append('room_category_id', property.room_category_id)
        data.append('user_id', property.user_id)
        data.append('_method', 'PUT');
        console.log(data.get('name'));
        if(imageFile.name) {
            data.append('thumbnail', imageFile)
        } 
        axios.post(`/api/properties/edit/${id}`, data)
            .then(res=> {
                Swal.fire({
                    icon: 'success',
                    title: 'Property successfully edited!'
                  })
                redirect(`/properties/${id}`)
            })
            .catch(err=> {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.message
                })
                setProperty({ ...property, errors: err.response.data.errors })
            })
        }


    const handleSubmit = (e)=> {
        e.preventDefault();
        editProperty()
    }

    const handleChange = (e)=> {
        setProperty({...property, [e.target.id]: e.target.value})
    }

    const handleFile = (e)=> {
        setImageFile(e.target.files[0])
    }

    const errorMsg = (type)=> {
        return (
          <div>
             <div className="text-red-600 mt-1">
            { property.errors?.[type]?.map((msg, index)=> (
              <p key={index}>{msg}</p>
            ))}
          </div>
          </div>
        )
      }

  return (
    <div  className="px-4 mt-16">
    <div className="min-h-screen flex flex-col justify-center items-center mt-8">
   {/* FORM */}
   <div className="w-[55%] bg-grey-lighter shadow-lg p-8">
    <h1 className="mb-8 text-3xl text-center">Edit Listing</h1>
      <form onSubmit={ handleSubmit }>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-md text-gray-700 font-bold">
            Name
          </label>
          <input value={ property.name } onChange={ handleChange } id="name" name="name" type="text" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            { errorMsg('name') }
        </div>

        {/* Price */}
        <div className="mt-4">
          <label htmlFor="price" className="block text-md text-gray-700 font-bold">
            Rental S$
          </label>
          <input value={ property.price } onChange={ handleChange } id="price" name="price" type="text" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            { errorMsg('price') }
        </div>

        {/* Category */}
        <div className="mt-4">
          <label htmlFor="category_id" className="block text-md text-gray-700 font-bold">
              Category
          </label>
          <select value={ property.category_id } onChange={ handleChange } id="category_id" name="category_id" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option className="text-sm" value="">-- Select category --</option>
                { categories ? categories.map((category, index)=> (
                  <option className="text-sm" key={ index } value={ category.id}>{ category.name }</option>
                )) : ''}
          </select>
              { errorMsg('category_id') }
        </div>

        {/* Room_Category */}
        <div className="mt-4">
          <label htmlFor="room_category_id" className="block text-md text-gray-700 font-bold">
              Room Category
          </label>
          <select value={ property.room_category_id } onChange={ handleChange } id="room_category_id" name="category_id" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option className="text-sm" value="">-- Select room category --</option>
                { roomCategories ? roomCategories.map((category, index)=> (
                  <option className="text-sm" key={ index } value={ category.id}>{ category.name }</option>
                )) : ''}
          </select>
              { errorMsg('room_category_id') }
        </div>

        {/* Description */}
        <div className="mt-4">
            <label htmlFor="description" className="block text-md text-gray-700 font-bold">
              Description
            </label>
            <textarea value={ property.description } 
                      onChange={ handleChange } 
                      id="description" name="description" 
                      type="text" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                      rows="3"/>
              { errorMsg('description') }
        </div>

        {/* Thumbnail */}
        <div className="mt-4">
          <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-1">
            Thumbnail
          </label>
          <input type="file" id="thumbnail" onChange={ handleFile } />
          <h3 className="mt-1 font-bold text-red-900">Select file    to replace current image(below):</h3>
          <p className="text-blue-500">{ property.thumbnail}</p>
        </div>
       
        {/* Save Button */}
        <div className="mt-4 w-[100%]">
            <button type="submit" className="btn btn-success btn-md w-[100%] flex items-center px-3 py-2 text-white rounded">
                <span>Edit</span>
            </button>
         </div>
      </form>
      </div>
    </div>
  </div>
  )
}

export default EditForm
