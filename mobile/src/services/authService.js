import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api.config';
import { STORAGE_KEYS } from '../config/constants';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
      if (response.data.token) {
        await this.saveToken(response.data.token);
        await this.saveUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(phone, password) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.LOGIN, { phone, password });
      if (response.data.token) {
        await this.saveToken(response.data.token);
        await this.saveUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify OTP
  async verifyOTP(phone, otp) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.VERIFY_OTP, { phone, otp });
      if (response.data.token) {
        await this.saveToken(response.data.token);
        await this.saveUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout
  async logout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  // Check if user is logged in
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // Save token
  async saveToken(token) {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  // Save user data
  async saveUser(user) {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  // Handle errors
  handleError(error) {
    if (error.response) {
      return error.response.data.message || 'Server error occurred';
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    } else {
      return error.message || 'An error occurred';
    }
  }
}

export default new AuthService();
