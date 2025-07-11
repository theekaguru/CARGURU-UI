import { Outlet } from "react-router"
import { Card } from "./Card"
import { SideNav } from "./SideNav"


export const Layout = () => {
  return (
    <div>
          <div>
            <SideNav/>
          </div>
          <div>
            <Card>
              <Outlet/>
            </Card>
          </div>
    </div>
  )
}
