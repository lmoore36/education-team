"use client";
import Likes from '@/lib/actions/likes'
import { useEffect, useOptimistic } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';

export default function Posts({ posts}) {
    const [optimisticPosts, addOptimisticPost] = useOptimistic(
        posts,
        (currentOptimisticPosts, newPost) => {
            const newOptimisticPosts = [...
            currentOptimisticPosts];
            const index = newOptimisticPosts.findIndex(
                post => post.id === newPost.id);
            newOptimisticPosts[index] = newPost
            return newOptimisticPosts;
        } 
    )

    const supabase = createClientComponentClient();
    const router = useRouter();
  
    useEffect(() => {
      const channel = supabase
        .channel("realtime posts")
        .on(
          "postgres_changes",
            { event: "*", schema: "public", table: "posts", },
            (payload) => { router.refresh(); })

        .subscribe();

    return () => {
      supabase.removeChannel(channel); };}, [supabase, router]);

    return optimisticPosts.map(post => (
        <div key={post.id}>
          <p>{post?.profiles?.full_name} {post?.profiles?.username}</p>
          <p>{post.text}</p>
          <Likes post={post} addOptimisticPost={addOptimisticPost}/>
        </div>
      ))
}
