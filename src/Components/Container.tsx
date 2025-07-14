import type { ReactNode } from "react"

interface ContainerProps{
    children:ReactNode,
    className:string
}
export const Container = (props:Readonly<ContainerProps>) => {
  return (
    <div className={`flex flex-col min-h-fit mx-auto xl:px-0 ${props.className? props.className :""}`}>
        
       {props.children}

    </div>
  )
}
