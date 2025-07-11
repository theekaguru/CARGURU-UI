import { Footer } from "../Components/Footer"
import { UserNavbar } from "../Components/UserNavbar"

import { Layout } from "../GlobalDashboard/Layout"


export const UsersDashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b]">
        <UserNavbar/>
        <Layout/>
        <Footer/>
    </div>
  )
}
