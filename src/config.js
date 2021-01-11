module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_BASE_URL: 
      process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
    TEST_DATABASE_URL:
      process.env.TEST_DATABASE_URL || "postgresql://postgres@localhost/neighbr-api-test",
    DATABASE_URL: 
      process.env.DATABASE_URL || 'postgresql://postgres@localhost/neighbr-api',
    JWT_SECRET:
      process.env.JWT_SECRET,
  }