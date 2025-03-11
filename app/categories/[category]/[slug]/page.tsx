"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getContentBySlug } from "@/lib/content"
import { useAuthStore, isAdmin } from "@/lib/auth"
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

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params
  const content = getContentBySlug(slug)
  const { user } = useAuthStore()
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="bg-primary text-primary-foreground py-4 md:py-6">
          <div className="container mx-auto px-4">
            <Link
              href={`/categories/${category}`}
              className="inline-flex items-center text-primary-foreground hover:underline mb-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Category
            </Link>
          </div>
        </header>
        <main className="flex-1 py-8 md:py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-6">Article Not Found</h1>
            <p>The article you're looking for doesn't exist or has been moved.</p>
          </div>
        </main>
      </div>
    )
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      // In a real app, this would send a delete request to an API
      // For this demo, we'll just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the category page after "deleting" the content
      router.push(`/categories/${category}`)
    } catch (error) {
      console.error("Error deleting content:", error)
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 md:py-6">
        <div className="container mx-auto px-4">
          <Link
            href={`/categories/${category}`}
            className="inline-flex items-center text-primary-foreground hover:underline mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to {content.category}
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-none shadow-none">
            <CardHeader className="px-0 pt-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Category: {content.category}</div>
                  <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    {content.title}
                  </CardTitle>
                </div>

                {isAdmin(user) && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        router.push(`/edit/${content.id}`)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-0 text-lg">
              <p>{content.content}</p>
            </CardContent>
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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article "{content.title}" from the wiki.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

