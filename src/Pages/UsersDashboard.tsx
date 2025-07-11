import { Footer } from "../Components/Footer"
import { UserNavbar } from "../Components/UserNavbar"
import { Layout } from "../UserDashboardLayout/Layout"


export const UsersDashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] ">
        <UserNavbar/>
        <Layout/>
        <Footer/>
    </div>
  )
}
