export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: process.env.DATABASE_SYNC || true,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME || '600s',
  jwtDateExpirationTime: process.env.JWT_DATE_EXPIRATION_TIME || '600',
});
