
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": `dev-${process.env.DB_DATABASE}`,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
   "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": `test-${process.env.DB_DATABASE}`,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": `prod-${process.env.DB_DATABASE}`,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT
  }
}
