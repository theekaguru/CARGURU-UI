import { Outlet } from "react-router"
import { Card } from "../AdminCard"
import { SideNav } from "../AdminSideNav"


export const Layout = () => {
  return (
    <div className="flex max-h-fit min-h-full">
          <div className="min-w-[15%]">
                <SideNav/>
          </div>
          <div className="flex flex-col min-w-[85%]">
                <div className="h-fit">
                        <Card className="rounded-lg border-4 border-[#574f1f]">
                        <p className="text-white">Admin💪</p>
                        <Outlet />
                        </Card>

                </div>

          </div>
    </div>
  )
}