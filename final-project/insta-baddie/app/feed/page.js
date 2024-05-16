import Nav from '../nav';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function FeedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>You must be logged in to view the feed.</div>
  }

  return (
      <main>
        <Nav/> 
        <div id='body'> 
          <p> This is your feed </p>
        </div>
      </main>
    );
  }