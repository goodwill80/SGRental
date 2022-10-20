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
  const [ likes, setLikes ] = useState(0)
  const [ loggedUserId, setLoggedUserId ] = useState()
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
 
  
  const setSingleProperty = (data)=> {
    setProperty(data);
  }

  // API CALL TO RETRIEVE ALL PROPERTIES
  const retrieveProperties = (id) => {
    axios.get(`/api/user/properties?userid=${id}`)
    .then(res=> {
          setProperties(res.data.data);
      })
    .catch(err=> console.log(err))
  }

  // API TO RETRIEVE ALL PROPERTY CATEGORIES
  const retrieveCategories = () => {
    axios.get('/api/categories')
        .then(res=> setCategories(res.data))
        .catch(err=> console.log(err))
  }

  // API TO RETRIEVE ALL ROOM CATEGORIES
  const retrieveRoomCategories = () => {
    axios.get('/api/room_categories')
        .then(res=>setRoomCategories(res.data))
        .catch(err=>console.log(err))
  }

  // API TO RETRIEVE LOGGED USER INFO
  const retrieveUser = ()=> {
      axios.get('/api/user')
        .then(res=> setUser(res.data))
        .catch(err=>{
          // console.log(err)
        } )
  }

  // API TO RETRIEVE LIKES COUNT
  const retrieveLikes = (propertyId)=> {
    axios.get(`/api/property/likescount/${propertyId}`)
      .then(res=> setLikes(res.data.count))
      .catch(err=>console.log(err))
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
                                    retrieveProperties,
                                    retrieveLikes,
                                    likes,
                                    setLikes,
                                    loggedUserId,
                                    setLoggedUserId
                                     }}>
        { props.children }
    </PropertyContext.Provider>
  )
}

export {PropertyContext, PropertyContextProvider}
