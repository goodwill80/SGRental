import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { useCookies } from "react-cookie";

const PropertyContext = createContext();

function PropertyContextProvider(props) {

  const [ property, setProperty ] = useState({});
  const [ properties, setProperties ] = useState([])
  const [ categories, setCategories ] = useState([])
  const [ roomCategories, setRoomCategories ] = useState([])
  const [ user, setUser ] = useState({})
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
 
  
  const setSingleProperty = (data)=> {
    setProperty(data);
  }

  // API CALL TO RETRIEVE
  const retrieveProperties = (id) => {
    axios.get(`/api/user/properties?userid=${id}`)
    .then(res=> {
          setProperties(res.data.data);
      })
    .catch(err=> console.log(err))
  }


  const retrieveCategories = () => {
    axios.get('/api/categories')
        .then(res=> setCategories(res.data))
        .catch(err=> console.log(err))
  }

  const retrieveRoomCategories = () => {
    axios.get('/api/room_categories')
        .then(res=>setRoomCategories(res.data))
        .catch(err=>console.log(err))
  }

  const retrieveUser = ()=> {
      axios.get('/api/user')
        .then(res=> setUser(res.data))
        .catch(err=>{
          // console.log(err)
        } )
  }

  return (
    <PropertyContext.Provider value={{ 
                                    property, 
                                    setSingleProperty,
                                    retrieveCategories,
                                    retrieveRoomCategories,
                                    categories, 
                                    roomCategories,
                                    cookie,
                                    setCookie,
                                    removeCookie,
                                    retrieveUser,
                                    user,
                                    properties,
                                    setProperties,
                                    retrieveProperties
                                     }}>
        { props.children }
    </PropertyContext.Provider>
  )
}

export {PropertyContext, PropertyContextProvider}
