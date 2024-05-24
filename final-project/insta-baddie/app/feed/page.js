import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Nav from '../nav';
import NewPost from '@/components/post-form';
import Posts from '@/lib/actions/posts'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase.from("posts").select("*, profiles(*), likes(*)");
  
  const posts =
    data?.map((post) => ({
      ...post,
      user_has_liked_post: !!post.likes.find(
        (like) => like.user_id === session.user.id),
      likes: post.likes.length,
    })) ?? [];

  return (
    <>
      <Nav />
      <NewPost/>
      <Posts posts={posts}/>
    </>
  )
}