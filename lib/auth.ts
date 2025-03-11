// Simple authentication library for the wiki
// In a real application, you would use a more robust solution like NextAuth.js

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

// User types
export type UserRole = "user" | "admin"

export interface User {
  id: string
  username: string
  role: UserRole
}

// Mock user database
export const USERS = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In a real app, passwords would be hashed
    role: "admin" as UserRole,
  },
  {
    id: "2",
    username: "user",
    password: "user123",
    role: "user" as UserRole,
  },
]

// Auth store interface
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

// Create auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (username, password) => {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          })

          const data = await response.json()

          if (data.success) {
            set({
              user: data.user,
              isAuthenticated: true,
            })
          }

          return data
        } catch (error) {
          console.error("Login error:", error)
          return { success: false, message: "An error occurred during login" }
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
    }
  )
)

// Helper function to check if user is admin
export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

