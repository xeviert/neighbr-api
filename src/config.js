module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: "http://localhost:8000",
    API_BASE_URL: 
      process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
    TEST_DB_URL:
      process.env.TEST_DB_URL || "postgresql://postgres@localhost/neighbr-api-test",
    DB_URL: 
      process.env.DB_URL || 'postgresql://postgres@localhost/neighbr-api',
    JWT_SECRET:
      process.env.JWT_SECRET,
  }