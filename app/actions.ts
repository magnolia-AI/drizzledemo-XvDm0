'use server';

import db from '@/lib/db';
import { posts } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function addPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  await db.insert(posts).values({ title, content, createdAt: new Date() });
  revalidatePath('/posts');
}


