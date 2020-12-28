module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: "http://localhost:3000",
    API_BASE_URL: 
      process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api"
  }