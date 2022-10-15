import React, { useEffect, useState, useContext } from 'react'
import { PropertyContext } from '@/Context/PropertyContext'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateForm() {

  const redirect = useNavigate();

  const [ form, setForm ] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    room_category_id: '',
    user_id: '',
    thumbnail: '',
    errors: {},
    isLoading: false
  })


  const { name, price, description, category_id, room_category_id, user_id, thumbnail } = form;
  const { categories, roomCategories, retrieveCategories, retrieveRoomCategories } = useContext(PropertyContext)

  const retrieveLoggedUser = () => {
    axios.get('/api/user')
      .then(res=> {
        // console.log(res)
          setForm({...form, user_id: res.data.id})
      })
      .catch(err=> {
        // console.log(err.message)
        redirect('/login')
      })
  }

  useEffect(()=> {
    retrieveCategories();
    retrieveRoomCategories();
    retrieveLoggedUser();
  }, [])

  // HANDLE FORM CHANGE AND STATES
  const handleChange = (e)=> {
    setForm({...form, [e.target.id]: e.target.value });
  }

  const handleFile = (e)=> {
    setForm({...form, thumbnail: e.target.files[0] });
  }

  // Send Data via API to create new Listing
  const handleSubmit = (e)=> {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category_id', category_id);
    formData.append('user_id', user_id);
    formData.append('room_category_id', room_category_id);
    formData.append('thumbnail', thumbnail);
    formData.append('description', description);
    axios.post('api/properties/create', formData)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'New Property Created!'
        })
        redirect('/properties');
      })
      .catch(error => {
        Swal.fire({
            icon: 'error',
            title: error.response.data.message
        })
        setForm({ ...form, errors: error.response.data.errors })
    })
  }

  const errorMsg = (type)=> {
    return (
      <div>
         <div className="text-red-600 mt-1">
        { form.errors?.[type]?.map((msg, index)=> (
          <p key={index}>{msg}</p>
        ))}
      </div>
      </div>
    )
  }

  if(form.user_id) {
    return (
      <div  className="px-4 mt-16">
      <div className="min-h-screen flex flex-col justify-center items-center mt-8">
     {/* FORM */}
     <div className="w-[50%] bg-grey-lighter shadow-lg p-8">
      <h1 className="mb-8 text-3xl text-center">Create New Rental</h1>
        <form onSubmit={ handleSubmit }>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium text-md text-gray-700 font-bold">
              Name
            </label>
            <input value={ name } onChange={ handleChange } id="name" name="name" type="text" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              { errorMsg('name') }
          </div>

          {/* Price */}
          <div className="mt-4">
            <label htmlFor="price" className="block text-md text-gray-700 font-bold">
              Price
            </label>
            <input value={ price } onChange={ handleChange } id="price" name="price" type="text" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              { errorMsg('price') }
          </div>

          {/* Category */}
          <div className="mt-4">
            <label htmlFor="category_id" className="block text-md text-gray-700 font-bold">
                Category
            </label>
            <select value={ category_id } onChange={ handleChange } id="category_id" name="category_id" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
            <select value={ room_category_id } onChange={ handleChange } id="room_category_id" name="category_id" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
              <textarea value={ description } onChange={ handleChange } id="description" name="description" type="text" className="block mt-1 w-full rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                { errorMsg('description') }
          </div>

          {/* Thumbnail */}
          <div className="mt-4">
            <label htmlFor="thumbnail" className="block text-gray-700 font-bold">
              Thumbnail
            </label>
            <input type="file" id="thumbnail" onChange={ handleFile } />
          </div>
         
          {/* Save Button */}
          <div className="mt-4 w-[100%]">
              <button type="submit" className="btn btn-success btn-md w-[100%] flex items-center px-3 py-2 text-white rounded">
                  <span>Save New Listing</span>
              </button>
           </div>
        </form>
        </div>
      </div>
    </div>
    )
  }

  
}

export default CreateForm
