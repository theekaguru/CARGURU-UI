import { Container } from "../Components/Container"
import { Footer } from "../Components/Footer"
import Companies from "../Components/Homepage/Companies"
import FeaturedCars from "../Components/Homepage/FeaturedCars"
import { Hero } from "../Components/Homepage/Hero"
import Testimonials from "../Components/Homepage/Testimonials"
import { Navbar } from "../Components/Navbar"

export const Home = () => {
  return (
    <>
   <Container className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b]">
    <Navbar/>
    <Hero/>
    <FeaturedCars/>
    <Companies/>
    <Testimonials/>
    <Footer/>
    </Container>

    </>
  )
}
