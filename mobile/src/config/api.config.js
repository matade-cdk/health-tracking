// API Configuration
export const API_CONFIG = {
  // Change this to your backend API URL
  BASE_URL: __DEV__ 
    ? 'http://localhost:5000/api'  // Development (local backend)
    : 'https://your-production-api.com/api',  // Production
  
  TIMEOUT: 10000, // 10 seconds
  
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    
    // User
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update',
    
    // Health Records
    HEALTH_RECORDS: '/health/records',
    ADD_READING: '/health/add',
    GET_READINGS: '/health/user',
    
    // Reminders
    REMINDERS: '/reminders',
    ADD_REMINDER: '/reminders/add',
    UPDATE_REMINDER: '/reminders/update',
    DELETE_REMINDER: '/reminders/delete',
    
    // Sync
    SYNC: '/sync/data',
  }
};

export default API_CONFIG;
