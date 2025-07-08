import "dotenv/config";
import db from "./db";
import { posts } from "./schema";

async function main() {
  try {
    console.log("Seeding database...");
    await db.insert(posts).values([
      {
        title: "First Post",
        content: "This is the first post.",
      },
      {
        title: "Second Post",
        content: "This is the second post.",
      },
    ]);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();

