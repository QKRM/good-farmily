import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthGuard } from "@/components/auth-guard"
import { NavBar } from "@/components/nav-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FARMILY WIKI",
  description: "Your comprehensive guide to growing and caring for animals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <NavBar />
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}



import './globals.css'