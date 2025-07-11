import type { ReactNode } from "react"

interface CardProps{
  children:ReactNode
}

export const Card:React.FC<CardProps> = ({children}) => {
  return (
    <div className="p-3 bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] ">
      {children}
    </div>
  )
}
