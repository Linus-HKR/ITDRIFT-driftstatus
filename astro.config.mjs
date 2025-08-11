// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        
      }
    }
  },

  env: {
    schema: {
      TICKET_FOLDER_PATH: envField.string({
        context: "server",
        access: "secret",
      }),
      SCHEDULE_FILE_PATH: envField.string({
        context: "server",
        access: "secret",
        endsWith: ".xlsx"
      }),
    }
  }
});