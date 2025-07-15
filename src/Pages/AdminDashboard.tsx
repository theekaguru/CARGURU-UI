
import { Container } from "../Components/Container"
import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"
import { Layout } from "../DashboardDesign/AdminLayout"


export const AdminDashboard = () => {
  return (
    <Container className="h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b]">
       <Navbar/>
       <Layout/>
       <Footer/> 
    </Container>
  )
}
