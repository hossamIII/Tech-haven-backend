import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    redisUrl: process.env.REDIS_URL, // lets core/workflows find Redis
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      // no 'port' here — Medusa reads process.env.PORT
    },
  },

  // <-- this must be TOP-LEVEL, not inside projectConfig
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    disable: false,
  },

  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: { redisUrl: process.env.REDIS_URL },
    },
    cache: {
      resolve: "@medusajs/cache-redis",
      options: { redisUrl: process.env.REDIS_URL },
    },
    workflows: {
      options: { redis: { url: process.env.REDIS_URL } },
    },
  },
})
