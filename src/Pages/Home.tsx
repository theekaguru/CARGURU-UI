import { Footer } from "../Components/Footer"
import Companies from "../Components/Homepage/Companies"
import { Hero } from "../Components/Homepage/Hero"
import { Testimonials } from "../Components/Homepage/Testimonials"
import { Navbar } from "../Components/Navbar"

export const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Companies/>
    <Testimonials/>
    <Footer/>
    </>
  )
}
