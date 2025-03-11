import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// 게시글 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const posts = await prisma.post.findMany({
      where: category ? { category } : undefined,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

// 게시글 생성
export async function POST(request: Request) {
  try {
    const { title, content, category, authorId } = await request.json()

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        authorId,
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
    console.error("Error creating post:", error)
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    )
  }
} 