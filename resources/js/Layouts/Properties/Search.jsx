import React from 'react'

function Search({ categories, room_categories, handlequery, handleCategoryId, handleRoomCategoryId } ) {

  const categoryList = categories?.map((category, index)=> {
    return (
      <option key={ index } id={category.id}>{ category.name }</option>
    )
  })

  const room_list = room_categories.map((category, index)=> {
    return (
      <option key={ index } id={category.id} >{ category.name }</option>
    )
  })

  return (
    <div className="form-control mt-2">
      <div className="input-group">
        <input name="global" onChange={(e)=>handlequery(e)} type="text" placeholder="Search…" className="input input-bordered w-[500px]" />
        <button className="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
       </div>
       <div className="flex">
        <div className="bg-gray-100 px-2">
          <select name='category_id' onChange={(e)=>handleCategoryId(e)} className="bg-gray-100 font-bold">
              <option>Housing Type</option>
              { categoryList }
          </select>
        </div>
        <div className="bg-gray-100 px-2">
          <select name="room_category_id" onChange={(e)=>handleRoomCategoryId(e)} className="bg-gray-100 font-bold">
              <option>Number of Bedrooms</option>
              { room_list }
          </select>
        </div>
        <div className="bg-gray-100 px-2">
          <select name="order_direction" onChange={(e)=>handlequery(e)} className="bg-gray-100 font-bold">
              <option>Sort by latest</option>
              <option>asc</option>
              <option>desc</option>
          </select>
        </div>
        </div>
      
    </div>
  )
}

export default Search
