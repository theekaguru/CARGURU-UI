

import { Layout } from 'lucide-react'
import { Footer } from '../Components/Footer'
import { Navbar } from '../Components/Navbar'


export const AdminDasboard = () => {
  return (
     <div className="h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b]">
            <Navbar/>
            <Layout/>
            <Footer/>
        </div>
  )
}
