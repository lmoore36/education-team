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

      return (optimisticPosts.map(post => ( <div key={post.id}>
        <div class="flex w-full p-8 border-b border-gray-300">
            <span class="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
            <div class="flex flex-col flex-grow ml-4">
                <div class="flex">
                    <span class="font-semibold">{post?.profiles?.full_name}</span>
                    <span class="ml-1">@{post?.profiles?.username}</span>
                    <span class="ml-auto text-sm">Just now</span>
                </div>
                    <p class="mt-1">{post.text} <a class="underline" href="#">#hashtag</a></p>
                    <div class="flex mt-2">
                    <Likes post={post} addOptimisticPost={addOptimisticPost} />
                    {/* <button class="text-sm font-semibold">Like</button> */}
                    <button class="ml-2 text-sm font-semibold">Reply</button>
                    <button class="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>              
        </div>
    </div>
    )))
};








