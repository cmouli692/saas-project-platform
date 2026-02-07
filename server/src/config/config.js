export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,

  clientUrl: process.env.CLIENT_URL,

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  features: {
    archive: process.env.FEATURE_ARCHIVE === "true",
    search: process.env.FEATURE_SEARCH === "true",
  },
};
