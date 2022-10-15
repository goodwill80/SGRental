import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { PropertyContext } from '@/Context/PropertyContext';

function Hero() {

  const { cookie } = useContext(PropertyContext);

  const redirectUser = () => {
    if(cookie.user) {
      return '/properties';
    } else {
      return 'register';
    }
   }

   const dynamicText = ()=> {
    if(cookie.user){
      return "EXPLORE"
    } else {
      return "GET STARTED"
    }
   }

  return (
    <>
        <div className="w-full relative mt-10">
            <img className="h-[550px] w-full" src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80" />
        </div>
        <div className="w-[700px] border-8 border-red-400 absolute top-[200px] left-[60px]">
            <h1 className="text-5xl font-sans p-4 text-yellow-300 my-8">
                UNLOCK MAXIMUM VALUE WHEN YOU RENT WITH US
            </h1>
            <Link to={redirectUser()}>
              <button class="btn btn-primary ml-4 mb-4">{dynamicText()}</button>
            </Link>
            
        </div>
    </>
  )
}

export default Hero
