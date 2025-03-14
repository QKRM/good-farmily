import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// 인증 및 권한 검증 함수
async function validateUserAccess(postId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return { authorized: false, error: "Unauthorized" }
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  })

  if (!post) {
    return { authorized: false, error: "Post not found" }
  }

  const isAdmin = session.user.role === "admin"
  const isAuthor = post.author.id === session.user.id

  if (!isAdmin && !isAuthor) {
    return { authorized: false, error: "Not authorized" }
  }

  return { authorized: true, post }
}

// 게시글 조회
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    )
  }
}

// 게시글 수정
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    // 인증 및 권한 검증
    const validation = await validateUserAccess(id)
    if (!validation.authorized) {
      return NextResponse.json(
        { error: validation.error },
        { status: 403 }
      )
    }

    const { title, content } = await request.json()

    // 입력값 검증
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      )
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title.trim(),
        content: content.trim(),
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    )
  }
}

// 게시글 삭제
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    // 인증 및 권한 검증
    const validation = await validateUserAccess(id)
    if (!validation.authorized) {
      return NextResponse.json(
        { error: validation.error },
        { status: 403 }
      )
    }

    await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
} 