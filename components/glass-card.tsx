import React from 'react'
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 border-green-500/50",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-green-500/10 before:to-transparent",
        "after:absolute after:inset-0 after:-z-10 after:bg-black/50 after:backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <div className="relative z-10 bg-gradient-to-br from-blue-900/30 to-green-900/30 p-6">
        {children}
      </div>
    </div>
  )
}

