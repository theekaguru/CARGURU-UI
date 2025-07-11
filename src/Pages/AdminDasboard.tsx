
import { AdminNavbar } from '../Components/adminNavbar'
import { Layout } from 'lucide-react'
import { Footer } from '../Components/Footer'

export const AdminDasboard = () => {
  return (
     <div className="h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b]">
            <AdminNavbar/>
            <Layout/>
            <Footer/>
        </div>
  )
}
