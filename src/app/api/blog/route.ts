import { NextResponse } from 'next/server'

// Temporärer In-Memory Storage (später durch Datenbank ersetzen)
let blogPosts: any[] = []

export async function POST(request: Request) {
  try {
    const post = await request.json()
    
    // Generiere eine einfache ID (später durch DB-ID ersetzen)
    const id = Date.now().toString()
    const newPost = {
      id,
      ...post,
      publishedAt: post.status === 'published' ? new Date().toISOString() : null
    }
    
    // Speichere den Post (später in Datenbank)
    blogPosts.push(newPost)
    
    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error('Error saving blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save blog post' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ posts: blogPosts })
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'No post ID provided' },
        { status: 400 }
      )
    }

    // Finde den Post-Index
    const postIndex = blogPosts.findIndex(post => post.id === id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // Entferne den Post
    blogPosts.splice(postIndex, 1)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
