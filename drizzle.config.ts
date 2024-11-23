import type { Config } from 'drizzle-kit'
export default {
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  driver: 'expo',
  dialect: 'sqlite',
} satisfies Config
