// medusa-config.ts
import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseLogging: false,
    workerMode: "shared",
    http: {
      storeCors: process.env.STORE_CORS ?? "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS ?? "http://localhost:7001",
      authCors: process.env.AUTH_CORS ?? "http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET!,       // must be set in Railway
      cookieSecret: process.env.COOKIE_SECRET!, // must be set in Railway
    },
    // TS types don’t know this key, runtime does. Keep the ignore.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    build: {
      rollupOptions: {
        external: ["@medusajs/dashboard"],
      },
    },
  },

  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL ?? "http://localhost:9000",
    disable: true,
  },

  modules: [],
  plugins: [],
})
