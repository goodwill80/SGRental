import React from 'react'
import { Link } from 'react-router-dom';

function ImageContainer({ image, slug, id }) {
  return (
    <div className="w-[100%] flex-col justify-center mb-4 md:w-[23%] relative">
      <Link to={`/properties/category/${id}`}>
        <img src={ image } alt="condo" className="rounded-md h-[250px] w-[90%] md:h-[150px] lg:h-[200px] md:w-[150px] lg:w-[300px]" />
        <div className="lg:absolute bottom-0 font-bold border-1 p-1 sm:bg-white md:bg-white lg:bg-red-500 rounded-lg w-[90%] md:w-[63%]">
            <h2 className="pl-1 text-red-900 text-lg md:text-sm md:text-black lg:text-white">{ slug.toUpperCase() }</h2>
        </div>
        </Link>
    </div>
  )
}

export default ImageContainer
