import { loadEnv, defineConfig } from "@medusajs/utils"

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
      jwtSecret: process.env.JWT_SECRET!,       // set in Railway
      cookieSecret: process.env.COOKIE_SECRET!, // set in Railway
    },
    // TS types don’t know about this, runtime does. Ignore the warning.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    build: {
      rollupOptions: {
        external: ["@medusajs/dashboard"],
      },
    },
  },

  admin: {
    backendUrl:
      process.env.MEDUSA_BACKEND_URL ?? "http://localhost:9000",
    disable: false,
  },

  modules: [],
  plugins: [],
})
