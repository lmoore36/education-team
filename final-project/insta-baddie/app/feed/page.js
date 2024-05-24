'use client'

import Nav from '../nav'
import PostForm from '@/components/post-form'

export default async function FeedPage() {
  return (
    <>
      <Nav />
      <div>
        <PostForm />
      </div>
    </>
  )
}