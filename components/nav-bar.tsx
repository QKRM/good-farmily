"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore, isAdmin } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { PlusCircle, LogOut } from "lucide-react"

export function NavBar() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%285%29-ELOVz0lyKx1xiTKzxU4wvkAvAQ5TLJ.png"
            alt="FARMILY WIKI Logo"
            className="h-8 w-auto invert"
          />
          FARMILY WIKI
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-sm mr-2">
            Logged in as <span className="font-medium">{user?.username}</span>
          </div>

          {isAdmin(user) && (
            <Button asChild size="sm" variant="secondary">
              <Link href="/create">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create
              </Link>
            </Button>
          )}

          <Button size="sm" variant="secondary" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

