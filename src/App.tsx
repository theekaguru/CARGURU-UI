import './App.css'
import {createBrowserRouter , RouterProvider} from "react-router"
import { Home } from './Pages/Home'
import { Error } from './Pages/Error'
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { Contact } from './Pages/Contact'
import { FAQ } from './Pages/FAQ'
import { About } from './Pages/About'
import { Book } from './Pages/Book'
import { UsersDashboard } from './Pages/UsersDashboard'
import { Activities } from './Components/UserDashboardContent/Activities'
import { DriveNow } from './Components/UserDashboardContent/DriveNow'
import { BookingHistory } from './Components/UserDashboardContent/BookingHistory'
import { Transactions } from './Components/UserDashboardContent/Transactions'
import { SupportTickets } from './Components/UserDashboardContent/SupportTickets'
import { Settings } from './Components/UserDashboardContent/Settings'
import ProtectedRoute from './Components/ProtectedRoute'



function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<Error/>
  },
  {
    path:'/register',
    element:<Register/>,
    errorElement:<Error/>
  },
  {
    path:'/login',
    element:<Login/>,
    errorElement:<Error/>
  },
  {
    path:'/contact',
    element:<Contact/>,
    errorElement:<Error/>
  },
  {
    path:'/faq',
    element:<FAQ/>,
    errorElement:<Error/>
  },
  {
    path:'about',
    element:<About/>,
    errorElement:<Error/>
  },
  {
    path:'book',
    element:<Book/>,
    errorElement:<Error/>
  },
  {
    path:'dashboard',
    element:(
      <ProtectedRoute>
        <UsersDashboard/>
      </ProtectedRoute>
          ),
    errorElement:<Error/>,
       children:[
        {
          path:'activities',
          element:<Activities/>,
          errorElement:<Error/>
        },
                {
          path:'driveNow',
          element:<DriveNow/>,
          errorElement:<Error/>
        },
                {
          path:'bookingHistory',
          element:<BookingHistory/>,
          errorElement:<Error/>
        },
                {
          path:'transactions',
          element:<Transactions/>,
          errorElement:<Error/>
        },
                        {
          path:'supportTickets',
          element:<SupportTickets/>,
          errorElement:<Error/>
        },
                        {
          path:'settings',
          element:<Settings/>,
          errorElement:<Error/>
        },
       ]
  }
])
  return (
     <RouterProvider router={router} />
  )
}

export default App
