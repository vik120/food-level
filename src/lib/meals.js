import sql from 'better-sqlite3';

const db = sql('meals.db', { fileMustExist: true });

export function getAllMeals() {
  return db.prepare('SELECT * FROM meals ORDER BY id DESC').all();
}