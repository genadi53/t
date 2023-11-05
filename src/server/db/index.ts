// import { Client } from "@planetscale/database";
// import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "@/env.mjs";
// import * as schema from "./schema";

// export const db = drizzle(
//   new Client({
//     url: env.DATABASE_URL,
//   }).connection(),
//   { schema }
// );

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = await mysql.createConnection({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  database: "code_quest",
  password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection, { mode: "default", schema });
