import ImageContainer from './ImageContainer';
import Condo from './Images/condo.jpeg';
import Conservation from './Images/conservation.jpeg';
import Landed from './Images/landed.jpeg';
import Public from './Images/public.jpeg';

function IntroDisplay() {

  const images = [
    {
        image: Conservation,
        slug: "conservation",
        id: 1
    },
    {
        image: Public,
        slug: "public",
        id: 2
    },
   {
        image: Condo,
        slug: "condo",
        id: 3
    },
    {
        image: Landed,
        slug: "landed",
        id: 4
    }
]



  return (
    <div className="px-16 my-8 min-w-full">
      <h1 className="text-2xl font-bold mb-4">Latest Properties </h1>
      <div className="flex flex-row justify-center items-center space-x-10">
       { images.map((image, index)=> (
            <ImageContainer
                key={ index }
                image={ image.image }
                slug={ image.slug}
                id={ image.id }
             />
       ))}
      </div>
    </div>
  )
}

export default IntroDisplay
