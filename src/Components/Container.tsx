import type { ReactNode } from "react"

interface ContainerProps{
    children:ReactNode,
    className:string
}
export const Container = (props:Readonly<ContainerProps>) => {
  return (
    <div className={`mx-auto xl:px-0 ${props.className? props.className :""}`}>
        
       {props.children}

    </div>
  )
}
