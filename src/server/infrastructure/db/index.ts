import { drizzle } from "drizzle-orm/mysql2";
import { type Connection, createConnection } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";
import * as musicSchema from "~/server/music/recomendations.drizzle.schema";

const globalForDb = globalThis as unknown as {
  conn: Connection | undefined;
};

export type DrizzleDb = ReturnType<typeof buildDrizzleClient>;

const buildDrizzleClient = (conn: Connection) => drizzle(conn, { schema: {
  ...schema,
  ...musicSchema,
}, mode: "default" });

export const getDb = async () => {
  const conn = globalForDb.conn ?? await createConnection({ uri: env.DATABASE_URL });
  globalForDb.conn = conn;
  return buildDrizzleClient(globalForDb.conn)
}