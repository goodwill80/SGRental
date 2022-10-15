import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Images/spinner.gif'
import PropertyContainer from '../../Layouts/Properties/PropertyContainer';

function CategoryPage() {
    const redirect = useNavigate();
    const [ properties, setProperties ] = useState([]);
    const { id } = useParams();

    const categories = ['1','2','3','4'];

    useEffect(()=> {
        axios.get(`/api/category?categoryid=${id}`)
            .then(res=> {
                setProperties(res.data.data)
            })
            .catch(err=>console.log(err))
    },[])

    if(!categories.includes(id)) {
        redirect('/')
    }

    

    if(!properties.length) {
        return(
            <div className="h-[800px] flex flex-col justify-center items-center">
                <img className="w-[20%]" src={Spinner} alt="spinner" />
            </div>
        )
    }

  return (

        <div className="mt-24 mx-4">
            <h1 className="text-4xl px-12">Browse <span className="font-bold">{properties[0].category.name.charAt(0).toUpperCase() + properties[0].category.name.slice(1)} Rental</span> Appartments</h1>
            <p className="mt-12 mb-8 px-12"><span className="font-bold">{properties[0].category.name.charAt(0).toUpperCase() + properties[0].category.name.slice(1)} apartments</span> are a type of private property with leaseholds of 99 years, 999 years or freeholds. Few condos were built until early 1990 and were designed for high income people, with apartment sizes approximately double that of the existing HDB properties. However, the condominiums that we know of today are much smaller apartment units than before, as can be seen in the list of condo floor plans that are readily available for new launch condo projects or resale condos apartments, but the key difference that makes condos so attractive is the exclusive facilities that come with buying a condominium. Condo residents enjoy the convenience of having private facilities that security guards, swimming pools, tennis courts, private gyms and basketball courts.</p>
            <div className="mt-2 px-4 min-w-max flex flex-col justify-center items-center">
            <h1 className="text-3xl text-red-900 font-bold font-sans underline wider">Featured Apartments</h1>
            { properties.map((property, index) => (
                <>
                    <PropertyContainer 
                        key={index}
                        id={property.id}
                        thumbnail={property.thumbnail}
                        name={property.name}
                        category={property.category.name}
                        price={property.price}
                        room_category={property.room_category.name} />
                </>
            ))}   
            </div>
        </div>
    )
  
}

export default CategoryPage
