import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`p-6 rounded-md shadow-md ${className}`}>
      {children}
    </div>
  );
};
