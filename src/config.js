module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_DATABASE_URL:
      process.env.TEST_DATABASE_URL || "postgresql://postgres@localhost/neighbr-api-test",
    DATABASE_URL: 
      process.env.DATABASE_URL || 'postgresql://postgres@localhost/neighbr-api',
    JWT_SECRET:
      process.env.JWT_SECRET,
  }