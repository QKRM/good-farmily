"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HighlightedText } from "@/components/highlighted-text"
import { allContent } from "@/lib/content"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<typeof allContent>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // Get the search query from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const query = params.get("q") || ""
    setSearchQuery(query)

    if (query) {
      performSearch(query)
    }
  }, [])

  // Search function
  const performSearch = (query: string) => {
    setIsSearching(true)

    // Simple search implementation - case insensitive matching in title or content
    const lowerQuery = query.toLowerCase()
    const results = allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery),
    )

    setSearchResults(results)
    setIsSearching(false)
  }

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)

    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 md:py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-primary-foreground hover:underline mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4">Search Results</h1>

          <form onSubmit={handleSearch} className="max-w-md">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search animals or topics..."
                className="pl-10 h-10 md:h-12 text-sm md:text-base w-full bg-primary-foreground text-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-primary" />
              <Button type="submit" className="absolute right-1 top-1 h-8 md:h-10" disabled={isSearching}>
                Search
              </Button>
            </div>
          </form>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {searchQuery ? (
            <>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-2">
                {searchResults.length} results for "{searchQuery}"
              </h2>
              <p className="text-muted-foreground mb-6">Click on any result to view the full article</p>

              {searchResults.length > 0 ? (
                <div className="grid gap-4 md:gap-6">
                  {searchResults.map((result) => (
                    <Link href={`/categories/${result.categorySlug}/${result.slug}`} key={result.id}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="text-sm text-muted-foreground mb-1">Category: {result.category}</div>
                          <CardTitle>
                            <HighlightedText text={result.title} highlight={searchQuery} />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <HighlightedText text={result.content} highlight={searchQuery} />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Enter a search term</h3>
              <p className="text-muted-foreground">Use the search box above to find information about animals</p>
            </div>
          )}
        </div>
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

