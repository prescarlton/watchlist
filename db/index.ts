import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import type { SQLJsDatabase } from 'drizzle-orm/sql-js'
import { openDatabaseSync } from 'expo-sqlite'

// import migrations from "./migrations/migrations";

const expoDb = openDatabaseSync('database.db', {
  enableChangeListener: true,
  useNewConnection: true,
})
export const db = drizzle(expoDb)

export const initialize = (): Promise<SQLJsDatabase | ExpoSQLiteDatabase> => {
  return Promise.resolve(db)
}

export type Db = typeof db
// export const useMigrationHelper = () => {
//   return useMigrations(db as ExpoSQLiteDatabase, migrations);
// };
