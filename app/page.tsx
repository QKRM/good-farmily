"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 md:py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">FARMILY WIKI</h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            Your comprehensive guide to growing and caring for animals
          </p>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-8 md:py-12 lg:py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-4 md:mb-6">
              Find What You Need
            </h2>
            <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
              <Input
                type="search"
                placeholder="Search animals or topics..."
                className="pl-10 h-10 md:h-12 text-sm md:text-base w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <Button type="submit" className="absolute right-1 top-1 h-8 md:h-10" disabled={!searchQuery.trim()}>
                Search
              </Button>
            </form>
          </div>
        </section>

        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-6 md:mb-8 text-center">
              Main Categories
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 md:pb-6">
                  <CardTitle className="text-lg md:text-xl">Chicken</CardTitle>
                  <CardDescription className="text-sm">Broilers, layers, free-range, and breeds</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 md:pb-6">
                  <div className="aspect-square bg-muted rounded-md overflow-hidden">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chicken-TEeWogsaE4jkWRwAIB3U9mVU8o6GzF.png"
                      alt="Close-up of a rooster with red-brown feathers"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full text-sm md:text-base">
                    <Link href="/categories/chicken">Explore Chicken</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 md:pb-6">
                  <CardTitle className="text-lg md:text-xl">Cow</CardTitle>
                  <CardDescription className="text-sm">Dairy, beef, calves, and breeding</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 md:pb-6">
                  <div className="aspect-square bg-muted rounded-md overflow-hidden">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cow-ew7jp7OHOM6ovyaI7Iw8gomE5YnRY3.png"
                      alt="Close-up portrait of a brown cow"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full text-sm md:text-base">
                    <Link href="/categories/cow">Explore Cow</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 md:pb-6">
                  <CardTitle className="text-lg md:text-xl">Goat</CardTitle>
                  <CardDescription className="text-sm">Dairy goats, meat breeds, and kids</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 md:pb-6">
                  <div className="aspect-square bg-muted rounded-md overflow-hidden">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/goat-mWLlJ6neUa8muMzEgOulEeEyMdBraE.png"
                      alt="Profile view of a white goat"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full text-sm md:text-base">
                    <Link href="/categories/goat">Explore Goat</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 md:pb-6">
                  <CardTitle className="text-lg md:text-xl">Pig</CardTitle>
                  <CardDescription className="text-sm">Sows, piglets, breeds, and feeding</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 md:pb-6">
                  <div className="aspect-square bg-muted rounded-md overflow-hidden">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pig-n7115X5aYXeRypEsiAxyZht7lKWzqY.png"
                      alt="Close-up of a pig peeking over fence"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full text-sm md:text-base">
                    <Link href="/categories/pig">Explore Pig</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-4 md:py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            FARMILY WIKI © {new Date().getFullYear()} | All rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

