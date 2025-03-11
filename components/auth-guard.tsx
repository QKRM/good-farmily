"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not authenticated and not already on the login page, redirect to login
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login")
    }
  }, [isAuthenticated, router, pathname])

  // If not authenticated, don't render children
  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  return <>{children}</>
}

