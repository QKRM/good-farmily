"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useAuthStore, isAdmin } from "@/lib/auth"
import { use } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface Post {
  id: string
  title: string
  content: string
  category: string
  author: {
    id: string
    username: string
    role: string
  }
}

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuthStore()
  const router = useRouter()

  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    fetchPost()
  }, [id, user])

  const fetchPost = async () => {
    try {
      setError(null)
      const response = await fetch(`/api/posts/${id}`)
      const data = await response.json()

      if (response.ok) {
        setPost(data)
        setTitle(data.title)
        setContent(data.content)
      } else {
        setError(data.error || "Failed to fetch post")
        toast({
          title: "Error",
          description: data.error || "Failed to fetch post",
          variant: "destructive",
        })
        router.push("/")
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      setError("An unexpected error occurred")
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect if not authorized
  useEffect(() => {
    if (!isLoading && (!user || (!isAdmin(user) && user.id !== post?.author.id))) {
      toast({
        title: "Access Denied",
        description: "You are not authorized to edit this post",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [isLoading, user, post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // 입력값 검증
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Post updated successfully",
        })
        router.push(`/categories/${post?.category}`)
      } else {
        setError(data.error || "Failed to update post")
        toast({
          title: "Error",
          description: data.error || "Failed to update post",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating post:", error)
      setError("An unexpected error occurred")
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-destructive">
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/")}
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 md:py-6">
        <div className="container mx-auto px-4">
          <Link
            href={`/categories/${post?.category}`}
            className="inline-flex items-center text-primary-foreground hover:underline mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Category
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Edit Post</h1>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Edit Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Question</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={200}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Answer</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="min-h-[200px]"
                    maxLength={5000}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Post"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

