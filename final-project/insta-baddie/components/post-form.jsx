import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewPost() {
  const addPost = async (formData) => {
    "use server";
    console.log("submitted")

    const text = String(formData.get("text"));
    const supabase = createServerActionClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("posts").insert({ text, user_id: user.id });
    }
  };

  return (
    <form className="flex w-full p-8 border-b-4 border-gray-300" action={addPost}>
      <span class="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
        <div class="flex flex-col flex-grow ml-4">
  
          <input
            name="text"              
            className="p-3 bg-transparent border border-gray-500 rounded-sm"
            placeholder="What's happening?"> 
          </input> 


          <div class="flex justify-between mt-2">                    
            <button class="flex items-center h-8 px-3 text-xs rounded-sm hover:bg-gray-200">Attach</button>
            <button class="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Post</button>
          </div>
        </div>
    </form>
  );
}