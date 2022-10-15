import Footer from "../Layouts/Home/Footer"
import Hero from "../Layouts/Home/Hero"
import IntroDisplay from "../Layouts/Home/IntroDisplay"

function Home() {
  return (
    <div className="min-h-max h-full mt-15">
        <Hero />
        <IntroDisplay />
        <Footer />
    </div>
  )
}

export default Home
