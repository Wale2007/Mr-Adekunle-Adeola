const { execSync } = require("child_process");

if (process.env.DATABASE_URL) {
  try {
    console.log("DATABASE_URL detected. Syncing schema with cloud database...");
    execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
    console.log("Database schema synced successfully.");
  } catch (err) {
    console.warn("Database sync encountered a warning, continuing build:", err.message);
  }
} else {
  console.log("No DATABASE_URL environment variable detected. Skipping cloud DB sync.");
}
