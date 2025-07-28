import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router"
import { Home } from './Pages/Home'
import { Error } from './Pages/Error'
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { Contact } from './Pages/Contact'
import { FAQ } from './Pages/FAQ'
import { About } from './Pages/About'
import { UsersDashboard } from './Pages/UsersDashboard'
import { Activities } from './Components/UsersDashboardContent/Activities'
import { DriveNow } from './Components/UsersDashboardContent/DriveNow'
import { BookingHistory } from './Components/UsersDashboardContent/BookingHistory'
import { SupportTickets } from './Components/UsersDashboardContent/SupportTickets'
import ProtectedRoute from './Components/ProtectedRoute'
import { AdminDashboard } from './Pages/AdminDashboard'
import { Bookings } from './Components/AdminDashboardContent/Bookings'
import { Cars } from './Components/AdminDashboardContent/Cars'
import { CarSpecifications } from './Components/AdminDashboardContent/CarSpecifications'
import { AdminSupport } from './Components/AdminDashboardContent/AdminSupport'
import { Dashboard } from './Components/AdminDashboardContent/Dashboard'
import { Location } from './Components/AdminDashboardContent/Location'
import { Analytics } from './Components/AdminDashboardContent/Analytics'
import { Users } from './Components/AdminDashboardContent/Users'
import { Profile } from './Components/AdminDashboardContent/Profile'
import { Settings } from './Components/UsersDashboardContent/Settings'
import { Payments } from './Components/UsersDashboardContent/Payments'
import { BookNow } from './Pages/BookNow'




function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <Error />
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <Error />
    },
    {
      path: '/contact',
      element: <Contact />,
      errorElement: <Error />
    },
    {
      path: '/faq',
      element: <FAQ />,
      errorElement: <Error />
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />
    },
    {
      path: 'booknow',
      element: <BookNow />,
      errorElement: <Error />
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <UsersDashboard />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: 'activities',
          element: <Activities />,
          errorElement: <Error />
        },
        {
          path: 'driveNow',
          element: <DriveNow />,
          errorElement: <Error />
        },
        {
          path: 'bookingHistory',
          element: <BookingHistory />,
          errorElement: <Error />
        },
        {
          path: 'payments',
          element: <Payments />,
          errorElement: <Error />
        },
        {
          path: 'supportTickets',
          element: <SupportTickets />,
          errorElement: <Error />
        },
        {
          path: 'settings',
          element: <Settings />,
          errorElement: <Error />
        },
      ]
    },
    {
      path: 'admindashboard',
      element: <AdminDashboard />,
      errorElement: <Error />,
      children: [
        {
          path: "Analytics",
          element: <Analytics />,
          errorElement: <Error />
        },
        {
          path: "users",
          element: <Users />,
          errorElement: <Error />
        },
        {
          path: "bookings",
          element: <Bookings />,
          errorElement: <Error />
        },
        {
          path: "cars",
          element: <Cars />,
          errorElement: <Error />
        },
        {
          path: "carSpecifications",
          element: <CarSpecifications />,
          errorElement: <Error />
        },
        {
          path: "adminSupport",
          element: <AdminSupport />,
          errorElement: <Error />
        },
        {
          path: "profile",
          element: <Profile />,
          errorElement: <Error />
        },
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "location",
          element: <Location />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
