/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.VITE_PUBLIC_DB_CONNECTION_STRING,
  },
};
