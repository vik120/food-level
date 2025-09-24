import sql from 'better-sqlite3';

const db = sql('meals.db', { fileMustExist: true });

export function getAllMeals() {
  return db.prepare('SELECT * FROM meals ORDER BY id DESC').all();
}

export async function getMeal(slug) {
  const meal =  await db.prepare('SELECT * FROM meals where slug=?').get(slug);
  return meal
}