import { createEnv } from "@t3-oss/env-core";
import { z } from "astro/zod";

export const env = createEnv({
  server: {
    TICKET_FOLDER_PATH: z.string(),
    SCHEDULE_FILE_PATH: z.string().endsWith(".xlsx"),
    INTERNAL_USERS: z.string().default("olalin, eksted, mindb"),
  },

  clientPrefix: "PUBLIC_",

  client: {},

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: process.env.CI === "true",
});
