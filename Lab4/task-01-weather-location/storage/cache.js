import * as SQLite from "expo-sqlite";

const DB_NAME = "weather-cache.db";
const TABLE = "last_weather";

function openDb() {
  if (typeof SQLite.openDatabaseSync === "function") {
    return SQLite.openDatabaseSync(DB_NAME);
  }
  return SQLite.openDatabase(DB_NAME);
}

let dbInstance = null;
function getDb() {
  if (!dbInstance) dbInstance = openDb();
  return dbInstance;
}

async function ensureTable() {
  const db = getDb();
  const ddl = `CREATE TABLE IF NOT EXISTS ${TABLE} (
      id INTEGER PRIMARY KEY NOT NULL,
      payload TEXT NOT NULL,
      saved_at TEXT NOT NULL
    );`;

  if (typeof db.execAsync === "function") {
    await db.execAsync(ddl);
    return;
  }

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => tx.executeSql(ddl),
      (err) => reject(err),
      () => resolve()
    );
  });
}

export async function saveLastWeather(data) {
  try {
    await ensureTable();
    const db = getDb();
    const payload = JSON.stringify(data);
    const savedAt = new Date().toISOString();

    if (typeof db.runAsync === "function") {
      await db.runAsync(`DELETE FROM ${TABLE};`);
      await db.runAsync(
        `INSERT INTO ${TABLE} (id, payload, saved_at) VALUES (1, ?, ?);`,
        [payload, savedAt]
      );
      return;
    }

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(`DELETE FROM ${TABLE};`);
          tx.executeSql(
            `INSERT INTO ${TABLE} (id, payload, saved_at) VALUES (1, ?, ?);`,
            [payload, savedAt]
          );
        },
        (err) => reject(err),
        () => resolve()
      );
    });
  } catch (e) {
    console.warn("saveLastWeather failed:", e?.message);
  }
}

export async function loadLastWeather() {
  try {
    await ensureTable();
    const db = getDb();

    if (typeof db.getFirstAsync === "function") {
      const row = await db.getFirstAsync(
        `SELECT payload, saved_at FROM ${TABLE} WHERE id = 1;`
      );
      if (!row) return null;
      return { data: JSON.parse(row.payload), savedAt: row.saved_at };
    }

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT payload, saved_at FROM ${TABLE} WHERE id = 1;`,
            [],
            (_, result) => {
              const row = result.rows.item(0);
              if (!row) {
                resolve(null);
                return;
              }
              resolve({
                data: JSON.parse(row.payload),
                savedAt: row.saved_at,
              });
            }
          );
        },
        (err) => reject(err)
      );
    });
  } catch (e) {
    console.warn("loadLastWeather failed:", e?.message);
    return null;
  }
}
