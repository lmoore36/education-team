'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/feed')
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error, data: userData } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  if (userData && userData.user) {
    await supabase
      .from('profiles')
      .upsert({ id: userData.user.id, email: userData.user.email })
  } 

  revalidatePath('/', 'layout')
  redirect('/feed')
}