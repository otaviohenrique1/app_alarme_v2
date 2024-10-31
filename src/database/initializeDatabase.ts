import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS alarmes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tempo TEXT NOT NULL,
      nome TEXT NOT NULL,
      ativo BOOLEAN NOT NULL,
    );
  `);
}
