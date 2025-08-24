import SQLite from 'react-native-sqlite-storage';
import { MeasurementEntry, WeightEntry } from '../types/entries';

SQLite.enablePromise(true);

const DB_NAME = 'fitness.db';

const open = () => SQLite.openDatabase({ name: DB_NAME, location: 'default' });

export const initDatabase = async () => {
  const db = await open();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS weight_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      weight REAL NOT NULL,
      imageUri TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS measurement_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      chest REAL,
      waist REAL,
      height REAL,
      biceps REAL,
      shoulder REAL,
      neck REAL,
      butt REAL
    );
  `);

  return db;
};

/* -------- Inserts -------- */
export const insertWeight = async (entry: WeightEntry) => {
  const db = await open();
  await db.executeSql(
    'INSERT INTO weight_entries (date, weight, imageUri) VALUES (?, ?, ?)',
    [entry.date, entry.weight, entry.imageUri ?? null]
  );
};

export const insertMeasurement = async (entry: MeasurementEntry) => {
  const db = await open();
  await db.executeSql(
    `INSERT INTO measurement_entries 
      (date, chest, waist, height, biceps, shoulder, neck, butt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      entry.date,
      entry.chest ?? null,
      entry.waist ?? null,
      entry.height ?? null,
      entry.biceps ?? null,
      entry.shoulder ?? null,
      entry.neck ?? null,
      entry.butt ?? null,
    ]
  );
};

/* -------- Queries -------- */
export const fetchWeights = async (): Promise<WeightEntry[]> => {
  const db = await open();
  const res = await db.executeSql('SELECT * FROM weight_entries ORDER BY id DESC');
  const rows = res[0].rows;
  const items: WeightEntry[] = [];
  for (let i = 0; i < rows.length; i++) items.push(rows.item(i));
  return items;
};

export const fetchMeasurements = async (): Promise<MeasurementEntry[]> => {
  const db = await open();
  const res = await db.executeSql('SELECT * FROM measurement_entries ORDER BY id DESC');
  const rows = res[0].rows;
  const items: MeasurementEntry[] = [];
  for (let i = 0; i < rows.length; i++) items.push(rows.item(i));
  return items;
};

/* -------- Optional deletes (handy later) -------- */
export const deleteWeight = async (id: number) => {
  const db = await open();
  await db.executeSql('DELETE FROM weight_entries WHERE id = ?', [id]);
};

export const deleteMeasurement = async (id: number) => {
  const db = await open();
  await db.executeSql('DELETE FROM measurement_entries WHERE id = ?', [id]);
};
