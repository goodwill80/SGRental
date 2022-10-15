import {useState, useEffect} from 'react';
import axios from 'axios';
import PropertyContainer from '../../Layouts/Properties/PropertyContainer';
import Footer from '@/Layouts/Home/Footer';
import Search from '../../Layouts/Properties/Search';
import Spinner from './Images/spinner.gif';

function Properties() {
const [isLoading, setIsLoading] = useState(true);
const [properties, setProperties] = useState([])
const [categories, setCategories] = useState([]);
const [roomCategories, setRoomCategories] = useState([])
const [meta, setMeta] = useState();
const [page, setPage] = useState(1);
const [categoryId, setCategoryId] = useState('');
const [roomCategoryId, setRoomCategoryId] = useState('');
const [query, setQuery] = useState({
    global: '',
    order_direction: ''
})

// Retrieve all properties
const retrieveProperties = ()=> {
    axios.get(`/api/properties?page=${page}&category_id=${categoryId}&room_category_id=${roomCategoryId}&global=${query.global}&order_direction=${query.order_direction}`)
    .then(res=> {
        // console.log(res.data);
        setMeta(res.data.meta);
        setProperties(res.data.data)
    })
    .catch(error=> console.log(error))
}

console.log(properties)

// Retrieve categories of housing
const retrieveCategories = ()=> {
    axios.get('/api/categories')
        .then(res=>setCategories(res.data))
        .catch(error=> console.log(error));
}

// Retrieve room categories
const retrieveRoomCategories = () => {
    axios.get('/api/room_categories')
        .then(res=>setRoomCategories(res.data))
        .catch(error=> console.log(error));
}

// Handle page change
const handlePageChange = (change)=> {
    if(change === "&laquo; Previous" || change === "Next &raquo;") return
    setPage(change);
}

// Handle search query
const handlequery = (e) => {
    setQuery({...query, [e.target.name]: e.target.value});
}

// Handle Category Id
const handleCategoryId = (e)=> {
    const cat = categories.filter((category)=> {
        return category.name == e.target.value;
    })
    if(cat.length > 0) {
        setCategoryId(cat[0].id)
    } else {
        setCategoryId('')
    }
}

// Handle Room Category Id
const handleRoomCategoryId = (e)=> {
    const cat = roomCategories.filter((category)=> {
        return category.name == e.target.value;
    })
    if(cat.length > 0) {
        setRoomCategoryId(cat[0].id)
    } else {
        setRoomCategoryId('')
    }
}

useEffect(()=> {
    retrieveProperties();
    retrieveCategories();
    retrieveRoomCategories();
    setIsLoading(false);
    }, [page, query.global, query.order_direction, categoryId, roomCategoryId  ])

const renderPaginationLinks = ()=> {
    const element = meta.links.map((link, index)=>(
        <button
            key={index}
            dangerouslySetInnerHTML={{__html: link.label}}
            onClick={()=>handlePageChange(link.label)}
            className="relative inline-flex px-4 py-2 -ml-px text-md 
            font-medium text-gray-700
            bg-white border border-gray-300 hover:text-gray-500
            focus:z-10 focus:outline-none focus:ring ring-gray-300 
            focus:border-blue-300 active:bg-gray-100 active:text-gray-700 
            transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"
         /> 
    ))
    return element;
} 
 
  if(isLoading) {
    return (
        <div className="h-[800px] flex flex-col justify-center items-center">
            <img className="w-[20%]" src={Spinner} alt="spinner" />
        </div>
    )
  } 
  

  if(properties.length === 0) return (
    <div className="mt-32 flex flex-col justify-center items-center w-[100%] p-4">
        
        <div className="flex flex-col justify-center items-center p-4 w-[75%] h-[200px] shadow-xl bg-gray-100 rounded-lg">
            <h1 className="font-bold pb-4 text-2xl">Houses for rent in Singapore</h1>
            <Search 
                room_categories={roomCategories}
                categories={categories}
                handlequery={handlequery}
                handleCategoryId={handleCategoryId}
                handleRoomCategoryId={handleRoomCategoryId}
            />
        </div>

        <h1 className="mt-16 text-red-400 text-lg">No properties found</h1>
    </div>
  )

  return (
    <>
    <div className="mt-32 flex flex-col justify-center items-center w-[100%] p-4">
        
        <div className="flex flex-col justify-center items-center p-4 w-[75%] h-[200px] shadow-xl bg-gray-100 rounded-lg">
            <h1 className="font-bold pb-4 text-2xl">Houses for rent in Singapore</h1>
            <Search 
                room_categories={roomCategories}
                categories={categories}
                handlequery={handlequery}
                handleCategoryId={handleCategoryId}
                handleRoomCategoryId={handleRoomCategoryId}
            />
        </div>
    
    </div>
    <div className="mt-2 px-4 min-w-max flex flex-col justify-center items-center">
       <div className="mt-16 flex flex-col justify-center items-center">
            <p className="font-bold text-lg">Page {meta.current_page} of {meta.last_page}</p>
            <p className="font-bold text-sm text-gray-400">showing result {meta.from} to {meta.to}</p>
            <p>of <span className="font-bold">{meta.total} properties</span> found</p>
            <div className="flex py-2">
                { renderPaginationLinks() }
            </div>
        </div>

      { properties.map((property, index) => (
        <PropertyContainer 
            key={index}
            id={property.id}
            thumbnail={property.thumbnail}
            name={property.name}
            category={property.category.name}
            price={property.price}
            room_category={property.room_category.name}
        />
      ))}
        <div className="mt-16 flex flex-col justify-center items-center">
            <p className="font-bold text-lg">Page {meta.current_page} of {meta.last_page}</p>
            <p className="font-bold text-sm text-gray-400">showing result {meta.from} to {meta.to}</p>
            <p>of <span className="font-bold">{meta.total} properties</span> found</p>

            <div className="flex py-4">
                { renderPaginationLinks() }
            </div>
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default Properties
