// seed-meals.js
const sql = require('better-sqlite3');
const db = sql('meals.db', { fileMustExist: false });

// Pragmas for safer, faster local dev
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const dummyMeals = [
  // ... your dummyMeals array exactly as you have it ...
];

db.prepare(`
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
  )
`).run();

// Optional: `node seed-meals.js --reset` to clear and reseed
const shouldReset = process.argv.includes('--reset');
if (shouldReset) {
  db.prepare('DELETE FROM meals').run();
}

// Upsert statement (id stays stable; everything else updates)
const upsertStmt = db.prepare(`
  INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
  VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    image = excluded.image,
    summary = excluded.summary,
    instructions = excluded.instructions,
    creator = excluded.creator,
    creator_email = excluded.creator_email
`);

// Seed only if empty OR when --reset is provided
const rowCount = db.prepare('SELECT COUNT(*) AS count FROM meals').get().count;
if (rowCount === 0 || shouldReset) {
  const seedTx = db.transaction((meals) => {
    for (const meal of meals) upsertStmt.run(meal);
  });
  seedTx(dummyMeals);
} else {
  // Even if not empty, make it idempotent: ensure existing slugs are updated
  const syncTx = db.transaction((meals) => {
    for (const meal of meals) upsertStmt.run(meal);
  });
  syncTx(dummyMeals);
}

console.log('✅ Meals table is ready and in sync.');
