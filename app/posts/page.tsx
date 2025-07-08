import db from '@/lib/db';
import { posts } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export default async function PostsPage() {
  const allPosts = await db.select().from(posts);

  async function addPost(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    await db.insert(posts).values({ title, content });
    revalidatePath('/posts');
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <form action={addPost} className="mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Post
        </button>
      </form>
      <div className="space-y-4">
        {allPosts.map((post) => (
          <div key={post.id} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

