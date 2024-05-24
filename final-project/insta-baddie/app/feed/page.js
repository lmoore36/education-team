import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Nav from '../nav';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: tweets } = await supabase.from("posts").select();

  return (
    <>
      <Nav />
      <div>
        {JSON.stringify(tweets, null, 2)};
      </div>
    </>
  )
}