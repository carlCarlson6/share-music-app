import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/**/*.drizzle.schema.ts",  
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["share-music-app_*"],
} satisfies Config;
