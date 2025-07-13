import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"

import { Layout } from "../UserDashboardLayout/Layout"


export const UsersDashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] ">
        <Navbar/>
        <Layout/>
        <Footer/>
    </div>
  )
}
