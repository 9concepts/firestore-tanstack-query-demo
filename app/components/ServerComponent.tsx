import { ReactNode } from "react"

export const ServerComponent = ({ children }: { children?: ReactNode }) => {
  return (<div>
    This is a React Server Component
    {children}
  </div>)
}
