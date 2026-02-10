"use client"

import { cn } from "@/lib/utils"

export function RadioGroup({ className, ...props }) {
  return <div className={cn("grid gap-2", className)} {...props} />
}

export function RadioGroupItem({ className, id, value, checked, onChange, ...props }) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={cn(
        "h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
      {...props}
    />
  )
}
