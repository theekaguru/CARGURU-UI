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
import { Profile } from './Components/UserDashboardContent/Profile'



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
    element:<UsersDashboard/>,
    errorElement:<Error/>,
       children:[
        {
          path:'profile',
          element:<Profile/>
        }
       ]
  }
])
  return (
     <RouterProvider router={router} />
  )
}

export default App
