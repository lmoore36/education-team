"use client";
import Likes from '@/lib/actions/likes';
import { useEffect, useOptimistic } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import isFollowing from './following'

export default function Posts({ posts }) {
  
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (currentOptimisticPosts, newPost) => {
      const newOptimisticPosts = [...currentOptimisticPosts];
      const index = newOptimisticPosts.findIndex(post => post.id === newPost.id);
      newOptimisticPosts[index] = newPost;
      return newOptimisticPosts;
    }
  );

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel("realtime posts").on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => { router.refresh(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  console.log(optimisticPosts)
  const following_posts = optimisticPosts.filter(follower_check);

  function follower_check(post) {

    return isFollowing(post)
  }

  return (
    following_posts.map(post => (
      <div key={post.id}>
        <div className="flex w-full p-8 border-b border-gray-300">
          <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
          <div className="flex flex-col flex-grow ml-4">
            <div className="flex">
              <span className="font-semibold">{post?.profiles?.full_name}</span>
              <Link href={`/${post?.profiles?.username}`}>
                <div className="ml-1">@{post?.profiles?.username}</div>
              </Link>
            </div>
            <p className="mt-1">
              {post.text}
            </p>
            <div className="flex mt-2">
              <Likes post={post} addOptimisticPost={addOptimisticPost} />
              {/* <button className="text-sm font-semibold">Like</button> */}
              <button className="ml-2 text-sm font-semibold">Reply</button>
              <button className="ml-2 text-sm font-semibold">Share</button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
