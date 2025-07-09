import db from './db';
import { posts } from './schema';

async function main() {
  await db.delete(posts);
  console.log('Cleared existing posts.');

  await db.insert(posts).values([
    {
      title: 'First Post',
      content: 'This is the content of the first post.',
      createdAt: new Date(),
    },
    {
      title: 'Second Post',
      content: 'This is the content of the second post.',
      createdAt: new Date(),
    },
  ]);

  console.log('Seeded 2 posts.');
}

main().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});

