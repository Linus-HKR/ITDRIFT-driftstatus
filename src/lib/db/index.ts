import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const sqlite = createClient({
  url: "file:./local.db",
});
export const db = drizzle({ client: sqlite, schema });
