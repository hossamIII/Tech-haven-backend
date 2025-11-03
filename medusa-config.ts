// medusa-config.ts
import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const isProd = process.env.NODE_ENV === "production"
const hasRedis = !!process.env.REDIS_URL

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL, // harmless if undefined; modules below check hasRedis

    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  // Local admin enabled; Prod admin disabled to avoid build & RAM blowups
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    disable: isProd || process.env.ADMIN_DISABLE === "true",
  },

  // Only wire Redis modules when REDIS_URL exists
  modules: {
    // Disable problematic modules to fix startup error
    inventory: false,
    product: false,
    order: false,
    ...(hasRedis && {
      eventBus: {
        resolve: "@medusajs/event-bus-redis",
        options: { redisUrl: process.env.REDIS_URL! },
      },
      cache: {
        resolve: "@medusajs/cache-redis",
        options: { redisUrl: process.env.REDIS_URL! },
      },
      workflows: {
        options: { redis: { url: process.env.REDIS_URL! } },
      },
    }),
  },
})
