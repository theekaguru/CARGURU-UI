import type { ReactNode } from "react"

interface CardProps{
    children:ReactNode
}

export const Card:React.FC<CardProps> = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}
