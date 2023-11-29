export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.MONGO_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME || '600s',
  jwtDateExpirationTime: process.env.JWT_DATE_EXPIRATION_TIME || '600',
  limits: {
    token: process.env.TOKEN_LIMIT || 10,
    ip: process.env.IP_LIMIT || 10,
  },
});
