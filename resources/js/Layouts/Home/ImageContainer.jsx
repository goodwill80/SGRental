import React from 'react'
import { Link } from 'react-router-dom';

function ImageContainer({ image, slug, id }) {
  return (
    <div className="w-[23%] relative">
      <Link to={`/properties/category/${id}`}>
        <img src={ image } alt="condo" className="rounded-md h-[200px]" />
        <div className="absolute bottom-0 font-bold border-1 bg-red-500 rounded-sm w-[63%]">
            <h2 className="text-white pl-2">{ slug.toUpperCase() }</h2>
        </div>
        </Link>
    </div>
  )
}

export default ImageContainer
