"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function createTweet(formData) {
  const supabase = createClient();

  const data = {
    text: formData.get("text"), // Assuming the form field for tweet text is named "text"
    user_id: formData.get("user_id"), // Assuming you have the user's ID available
  };

  // Insert the tweet data into the Supabase table
  const { data: tweetData, error } = await supabase.from('tweets').insert(data);

  if (error) {
    redirect("/error");
  }

  // Optionally, you can revalidate paths or redirect the user
  revalidatePath("/", "layout");
  redirect("/feed");
}