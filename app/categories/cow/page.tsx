"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Edit2, Trash2 } from "lucide-react"
import { useAuthStore, isAdmin } from "@/lib/auth"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Post {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  author: {
    id: string
    username: string
    role: string
  }
}

export default function CowPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/posts?category=cow`)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchPosts()
        setIsDeleteDialogOpen(false)
        setSelectedPostId(null)
      } else {
        console.error("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
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
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            <div className="w-full md:w-1/3 max-w-xs">
              <div className="aspect-square rounded-md overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cow-ew7jp7OHOM6ovyaI7Iw8gomE5YnRY3.png"
                  alt="Close-up portrait of a brown cow"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Cow</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-6 md:mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    {(isAdmin(user) || user?.id === post.author.id) && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/edit/${post.id}`)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedPostId(post.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    By {post.author.username} · {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => selectedPostId && handleDelete(selectedPostId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

