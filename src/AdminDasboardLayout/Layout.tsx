import { Outlet } from "react-router"
import { SideNav } from "./SideNav"
import { Card } from "./Card"


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
