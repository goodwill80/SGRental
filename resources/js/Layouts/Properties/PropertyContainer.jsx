import React from 'react'
import { Link } from 'react-router-dom';

function PropertyContainer({ name, price, category, room_category, thumbnail, id }) {
  return (
    <div className="w-[800px] mt-5 shadow-lg flex flex-col justify-center items-center bg-gray-100">
     <Link to={`/properties/${id}`}>
     <div className="my-4">
        <img className="w-[750px] h-[500px] rounded-sm" src={thumbnail} alt='property' />
        <div>
            <h1 className="text-xl pt-2 font-bold">{id}. {name}</h1>
            <p className="font-bold">{category.toUpperCase()}</p>
            <p>S${price} per month</p>
            <p className="font-bold">{room_category}</p>
        </div>
     </div>
     </Link>
    </div>
  )
}

export default PropertyContainer
