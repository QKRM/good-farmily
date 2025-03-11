"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useAuthStore, isAdmin } from "@/lib/auth"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  { value: "chicken", label: "Chicken" },
  { value: "cow", label: "Cow" },
  { value: "goat", label: "Goat" },
  { value: "pig", label: "Pig" },
]

export default function CreatePage() {
  const { user } = useAuthStore()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not admin
  if (!isAdmin(user)) {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          authorId: user?.id,
        }),
      })

      if (response.ok) {
        router.push(`/categories/${category}`)
      } else {
        console.error("Failed to create post")
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 md:py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-primary-foreground hover:underline mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Create New Post</h1>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Question</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Answer</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
              </CardFooter>
            </form>
          </Card>
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

