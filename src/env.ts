import { createEnv } from "@t3-oss/env-core";
import { z } from "astro/zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    TICKET_FOLDER_PATH: z.string(),
    SCHEDULE_FILE_PATH: z.string().endsWith(".xlsx"),
    INTERNAL_USERS: z.string().default("olalin, eksted, mindb"),
    REFRESH_INTERVAL: z.number().min(1000).max(60_000).default(15_000),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: process.env.CI === "true",
});
